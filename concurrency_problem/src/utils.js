import { Shares } from './shares.js';

export function buySharesConcurrently(customer, shares) {
  return new Promise((resolve, reject) => {
    const shareInstance = Shares.getInstance();
    let counter = 0;
    for (let i = 1; i <= 30; i++) {
      shareInstance
        .buy(`customer${i}`, 100)
        .then((_) => {
          counter++;
          if (counter === 30) {
            return resolve('success');
          }
        })
        .catch((err) => {
          counter++;
        });
    }
  });
}
