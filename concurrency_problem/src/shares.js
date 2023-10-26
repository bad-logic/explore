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

  static getInstance() {
    if (!Shares._instance) {
      Shares._instance = new Shares();
    }
    return Shares._instance;
  }
}
