import { Redis as IORedis } from 'ioredis';
import { LOCK_RELEASE_TIME, LOCK_NAME } from './constants.js';
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

  static _lockSharesOpLuaScript(conn) {
    conn.defineCommand('lockShares', {
      numberOfKeys: 0,
      lua: `
        local lockValue = ARGV[1]

        if redis.call("EXISTS", "${LOCK_NAME}") == 0 then
          -- create mutex lock only if it already does not exists
          redis.log(redis.LOG_DEBUG, 'adding a mutex lock with a value', lockValue)
          redis.call("SET", "${LOCK_NAME}", lockValue, "PX", "${LOCK_RELEASE_TIME}")
          return 1
        else
          -- if it already exists then someone is using the resource so mutex lock cannot be obtained
          return 0
        end
      `,
    });
  }

  static _releaseSharesOpLuaScript(conn) {
    // release the lock only if the lockValue matches ensuring that the
    // same entity can only release the lock
    conn.defineCommand('releaseSharesLock', {
      numberOfKeys: 0,
      lua: `
        local lockValue = ARGV[1]

        -- make sure lock exists before releasing
        if redis.call("EXISTS", "${LOCK_NAME}") == 1 then

          -- make sure the right client is trying to release the lock
          if redis.call("get", "${LOCK_NAME}") == lockValue then
            redis.log(redis.LOG_DEBUG, 'removing a mutex lock with a value', lockValue)
            redis.call("del", "${LOCK_NAME}")
            return 1
          else
            redis.log(redis.LOG_WARNING, 'no mutex lock with a value', lockValue)
            return 0
          end

        else
          -- no lock found, implicitly lock has been released
          -- lock was released before the operation could finish and unlock the mutex itself
          -- if this happens look at the mutex lock expiry time
          redis.log(redis.LOG_WARNING, 'expiration time is not enough for the operation to successfully release the lock')
          return 1
        end
      `,
    });
  }

  static _buySharesLuaScript(conn) {
    conn.defineCommand('buyShares', {
      numberOfKeys: 1,
      lua: `
            local sharesKey = KEYS[1]
            local requestedShares = ARGV[1]

            local currentShares = redis.call("GET", sharesKey)
            if currentShares < requestedShares then
              redis.log(redis.LOG_WARNING, 'not enough shares available')
              return {err = "error: not enough shares available"}
            end

            currentShares = currentShares - requestedShares
            redis.call("SET", sharesKey, currentShares)
      `,
    });
  }

  static _createLuaScripts(conn) {
    Redis._buySharesLuaScript(conn);
    Redis._lockSharesOpLuaScript(conn);
    Redis._releaseSharesOpLuaScript(conn);
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
