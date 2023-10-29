import { fileURLToPath } from 'node:url';
import process from 'node:process';

import { Redis } from './redis.js';
import {
  buySharesConcurrently,
  buySharesConcurrentlyWithRedisAtomicOperation,
  buySharesConcurrentlyWithRedisTransactionOperation,
  buySharesConcurrentlyWithLuaScriptsInsideRedisServer,
  buySharesConcurrentlyWithRedisLocks,
} from './utils.js';
import { TOTAL_SHARES, SHARES_KEY } from './constants.js';

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  Redis.connect()
    .then(async (_) => {
      try {
        console.info('connected to redis ✔️');
        // initialize total shares to be 1000
        await Redis.set(SHARES_KEY, TOTAL_SHARES);
        const totalShares = await Redis.get(SHARES_KEY);
        console.info({ totalShares: parseInt(totalShares) });

        // USERS BUYS SHARES SIMULTANEOUSLY
        // lets say 30 customer buys 100 shares each at the same time

        // await buySharesConcurrently(30, 100);
        // const totalSharesLeft = await Redis.get(SHARES_KEY);
        // console.info({ totalShares: parseInt(totalSharesLeft) });

        // all customers are able to buy the shares since they all see that there are 1000 shares

        // SOLUTIONS

        // USING ATOMIC OPERATION -> fail
        // await buySharesConcurrentlyWithRedisAtomicOperation(30, 100);

        // USING REDIS TRANSACTION -> fail
        // await buySharesConcurrentlyWithRedisTransactionOperation(30, 100);

        // USING LUA SCRIPTS
        await buySharesConcurrentlyWithLuaScriptsInsideRedisServer(30, 100);

        // USING MUTEX LOCKS
        // await buySharesConcurrentlyWithRedisLocks(30, 100);

        const totalSharesLeft = await Redis.get(SHARES_KEY);
        console.info({ totalShares: parseInt(totalSharesLeft) });
      } catch (err) {
        console.error(err);
        throw err;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
