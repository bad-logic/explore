import { Shares } from './shares.js';

const shareInstance = Shares.getInstance();

export function buySharesConcurrently(customer, shares) {
  return new Promise((resolve, reject) => {
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
          console.error(err);
          counter++;
        });
    }
  });
}

export function buySharesConcurrentlyWithRedisAtomicOperation(customer, shares) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    for (let i = 1; i <= 30; i++) {
      shareInstance
        .buyAtomically(`customer${i}`, 100)
        .then((_) => {
          counter++;
          if (counter === 30) {
            return resolve('success');
          }
        })
        .catch((err) => {
          console.error(err);
          counter++;
        });
    }
  });
}
