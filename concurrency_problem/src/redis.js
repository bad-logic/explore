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
  static async connect() {
    const conn = await _InternalRedis.establishConnection();
    Redis._createLuaScripts(conn);
    return conn;
  }

  static _createLuaScripts(conn) {
    conn.defineCommand('buyShares', {
      numberOfKeys: 1,
      lua: `
            local sharesKey = KEYS[1]
            local requestedShares = ARGV[1]

            local currentShares = redis.call("GET", sharesKey)
            if currentShares < requestedShares then
              return {err = "error: not enough shares available"}
            end

            currentShares = currentShares - requestedShares
            redis.call("SET", sharesKey, currentShares)
      `,
    });
  }

  static async getConnection() {
    return _InternalRedis.getConnection();
  }

  static async getNewConnection() {
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
