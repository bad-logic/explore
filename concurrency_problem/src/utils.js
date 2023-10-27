import { Shares } from './shares.js';

const shareInstance = Shares.getInstance();

export function buySharesConcurrently(customer, shares) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    for (let i = 1; i <= customer; i++) {
      shareInstance
        .buy(`customer${i}`, shares)
        .then((_) => {
          counter++;
          if (counter === customer) {
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
    for (let i = 1; i <= customer; i++) {
      shareInstance
        .buyAtomically(`customer${i}`, shares)
        .then((_) => {
          counter++;
          if (counter === customer) {
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

export function buySharesConcurrentlyWithRedisTransactionOperation(customer, shares) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    for (let i = 1; i <= customer; i++) {
      shareInstance
        .buyUsingRedisTransaction(`customer${i}`, shares)
        .then((_) => {
          counter++;
          if (counter === customer) {
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

export function buySharesConcurrentlyWithLuaScriptsInsideRedisServer(customer, shares) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    for (let i = 1; i <= customer; i++) {
      shareInstance
        .buyUsingLuaScripts(`customer${i}`, shares)
        .then((_) => {
          counter++;
          if (counter === customer) {
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
