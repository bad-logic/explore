import { fileURLToPath } from 'node:url';
import process from 'node:process';

import { Redis } from './redis.js';
import { buySharesConcurrently } from './utils.js';
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
        await buySharesConcurrently(30, 100);
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
