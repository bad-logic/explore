import { Redis as IORedis } from 'ioredis';

class _InternalRedis {
  static _redisClient;
  static _db = 1;

  static createConnection() {
    return new Promise((resolve, reject) => {
      const client = new IORedis({
        port: 6379, // Redis port
        host: 'localhost', // Redis host
        username: 'default', // needs Redis >= 6
        password: 'secretPassword',
        db: _InternalRedis._db, // Defaults to 0
      });
      client.on('ready', (t) => {
        resolve(client);
      });
      client.on('error', (err) => {
        reject(err);
      });
    });
  }

  static async establishConnection() {
    if (!_InternalRedis._redisClient) {
      _InternalRedis._redisClient = await _InternalRedis.createConnection();
    }
    return _InternalRedis._redisClient;
  }

  static getConnection() {
    return _InternalRedis.establishConnection();
  }
}

export class Redis {
  static connect() {
    return _InternalRedis.establishConnection();
  }

  static getNewConnection() {
    return _InternalRedis.createConnection();
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

  static async incrby(key, value) {
    const conn = await _InternalRedis.getConnection();
    await conn.incrby(key, value);
    return 'OK';
  }
}
