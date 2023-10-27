import { Redis } from './redis.js';
import { SHARES_KEY } from './constants.js';

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

  static getInstance() {
    if (!Shares._instance) {
      Shares._instance = new Shares();
    }
    return Shares._instance;
  }
}
