import { Redis } from './redis.js';
import { SHARES_KEY } from './constants.js';

export class Shares {
  static _instance;

  async buy(shares) {
    const currentShares = await Redis.get(SHARES_KEY);
    if (parseInt(currentShares) < shares) {
      console.info('no more shares available to buy');
      throw new Error('no shares available');
    }
    await Redis.set(SHARES_KEY, currentShares - shares);
  }

  static getInstance() {
    if (!Shares._instance) {
      Shares._instance = new Shares();
    }
    return Shares._instance;
  }
}
