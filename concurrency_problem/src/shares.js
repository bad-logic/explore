import { Redis } from './redis.js';
import { SHARES_KEY } from './constants.js';

export class Shares {
  static _instance;

  async buy(customer, shares) {
    const currentShares = await Redis.get(SHARES_KEY);
    if (parseInt(currentShares) < shares) {
      console.info(`${customer} attempts to buy ${shares} shares`);
      throw new Error('not enough shares available');
    }
    await Redis.set(SHARES_KEY, currentShares - shares);
    console.info(`${customer} successfully bought ${shares} shares`);
  }

  async buyAtomically(customer, shares) {
    const currentShares = await Redis.get(SHARES_KEY);
    if (parseInt(currentShares) < shares) {
      console.info(`${customer} attempts to buy ${shares} shares`);
      throw new Error('not enough shares available');
    }
    // decrement is handled by redis itself but the above check
    // always has the value 1000 as currentShares
    // if we didnot have to check the currentShares then this solution would work
    await Redis.incrby(SHARES_KEY, -shares);
    console.info(`${customer} successfully bought ${shares} shares`);
  }

  static getInstance() {
    if (!Shares._instance) {
      Shares._instance = new Shares();
    }
    return Shares._instance;
  }
}
