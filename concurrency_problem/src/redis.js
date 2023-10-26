import { Redis as IORedis } from 'ioredis';

class _InternalRedis {
  static _redisClient;
  static _db = 1;

  static getConnection() {
    return _InternalRedis.establishConnection();
  }

  static establishConnection() {
    return new Promise((resolve, reject) => {
      if (_InternalRedis._redisClient) {
        resolve(_InternalRedis._redisClient);
      } else {
        _InternalRedis._redisClient = new IORedis({
          port: 6379, // Redis port
          host: 'localhost', // Redis host
          username: 'default', // needs Redis >= 6
          password: 'secretPassword',
          db: _InternalRedis._db, // Defaults to 0
        });
        _InternalRedis._redisClient.on('ready', (t) => {
          resolve(_InternalRedis._redisClient);
        });
        _InternalRedis._redisClient.on('error', (err) => {
          reject(err);
        });
      }
    });
  }
}

export class Redis {
  static connect() {
    return _InternalRedis.establishConnection();
  }

  static async set(key, value) {
    const conn = await _InternalRedis.getConnection();
    await conn.set(key, value);
    return 'OK';
  }

  static async get(key) {
    const conn = await _InternalRedis.getConnection();
    const value = await conn.get(key);
    return value;
  }
}
