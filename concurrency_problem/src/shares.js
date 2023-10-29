import { ReplyError } from 'ioredis';
import { Redis } from './redis.js';
import { SHARES_KEY } from './constants.js';

function sleep(timeInMillisecond) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('delayed');
    }, timeInMillisecond);
  });
}

async function randomDelay() {
  const random = Math.random() * 10000;
  await sleep(random);
}

export class Shares {
  static _instance;

  async buy(customer, shares) {
    console.info(`${customer} attempts to buy ${shares} shares`);
    const currentShares = await Redis.get(SHARES_KEY);
    if (parseInt(currentShares) < shares) {
      throw new Error('not enough shares available');
    }
    await Redis.set(SHARES_KEY, currentShares - shares);
    console.info(`${customer} successfully bought ${shares} shares`);
  }

  async buyAtomically(customer, shares) {
    console.info(`${customer} attempts to buy ${shares} shares`);
    const currentShares = await Redis.get(SHARES_KEY);
    if (parseInt(currentShares) < shares) {
      throw new Error('not enough shares available');
    }
    // decrement is handled by redis itself but the above check
    // always has the value 1000 as currentShares
    // if we did not have to check the currentShares then this solution would work
    await Redis.incrby(SHARES_KEY, -shares);
    console.info(`${customer} successfully bought ${shares} shares`);
  }

  async buyUsingRedisTransaction(customer, shares) {
    console.info(`${customer} attempts to buy ${shares} shares`);
    // watch works with new connection only so
    const conn = await Redis.getNewConnection();

    // watch for the total shares changes
    await conn.watch(SHARES_KEY);

    const currentShares = await conn.get(SHARES_KEY);
    if (parseInt(currentShares) < shares) {
      throw new Error('not enough shares available');
    }

    // watch/exec will rollback incase someone else has changed the value of SHARE_KEY
    // after the watch command if rollback happens result will be null
    const result = await conn
      .multi()
      .set(SHARES_KEY, currentShares - shares)
      .exec(); // after exec the keys will be unwatched

    if (result === null) {
      console.info('someone else changed shares value before we could update');
      // instead of throwing error we could retry buying shares again
      // but for sake of simplicity abandoning whole operation
      throw new Error(`${customer} could not buy shares`);
    }
    console.info(`${customer} successfully bought ${shares} shares`);
  }

  async buyUsingLuaScripts(customer, shares) {
    console.info(`${customer} attempts to buy ${shares} shares`);

    try {
      const conn = await Redis.getConnection();
      /*
      Since the LUA script is performed in the Redis server level and two scripts cannot run simultaneously, 
      each buyer has to wait until it can proceed to get, validate and buy (if available) it’s shares 
      thus solving the concurrency problem we were having.
      */
      await conn.buyShares(SHARES_KEY, shares);
      console.info(`${customer} successfully bought ${shares} shares`);
    } catch (err) {
      if (err instanceof ReplyError) {
        throw new Error(`${customer}: not enough shares available`);
      }
      throw err;
    }
  }

  async buyUsingMutexLocks(customer, shares) {
    console.info(`${customer} attempts to buy ${shares} shares`);

    try {
      const conn = await Redis.getConnection();
      // acquire mutex lock
      const lockValue = new Date().getTime();
      // you can also use ioredis to create and release locks
      // since lua scripts are sequential and blocks other redis operations
      const status = await conn.lockShares(lockValue);
      if (status === 1) {
        // continue operation and release the mutex lock
        await this.buy(customer, shares);
        await conn.releaseSharesLock(lockValue);
      } else {
        // cannot acquire mutex lock
        // someone has it so wait it to be released and try again
        console.info(`${customer}: shares are locked from purchasing ...Retrying`);
        // retry or add logic to abandon operations after certain number of delays
        await randomDelay();
        try {
          await this.buyUsingMutexLocks(customer, shares);
        } catch (err) {
          // ignoring for simplicity
          return null;
        }
      }
    } catch (err) {
      console.log({ err, cmd: err.command });
      if (err instanceof ReplyError) {
        throw new Error(`${customer}: not enough shares available`);
      }
      throw err;
    }
  }

  static getInstance() {
    if (!Shares._instance) {
      Shares._instance = new Shares();
    }
    return Shares._instance;
  }
}
