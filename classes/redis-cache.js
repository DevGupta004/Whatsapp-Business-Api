const { Response } = require('./response');
const { logger } = require('../init/logger');
/**
 * @description - Class for caching the response
 * @param {object} req - request object
 */
class RedisCache {
  client;
  expiration;
  /**
   * @constructor
   * @param {object} req - request object
   * @param {number} expiration - time after which the cache data should expire
   */
  constructor(req, expiration = 300) {
    this.client = req.app.redisClient;
    this.expiration = expiration;
  }
  /**
   * @description - checks if the response is cached
   * @param {string} key - key for the response
   */
  isResponseCached(key) {
    return new Promise((resolve, reject) => {
      this.client
        .exists(key)
        .then((status) => {
          resolve(status);
        })
        .catch((error) => {
          console.log(error);
          reject(false);
        });
    });
  }
  /**
   * @description - gets the cached response if it exists
   * @param {string} key - key for which response is to be fetched from cache
   */
  getCachedResponse(key) {
    return new Promise((resolve, reject) => {
      this.client
        .get(key)
        .then((response) => {
          if(response) {
            logger.info(`getting response from cache`);
            logger.info(`cache key: ${key}`);
          }
          this.client.expire(key, 300);
          console.log("responseresponseresponse", response);
          resolve(JSON.parse(response));
        })
        .catch((error) => {
          console.log('logging the error getCachedResponse');
          console.log(error);
          reject(error);
        });
    });
  }
  /**
   * @description - save response in cache if it isn't there
   * @param {string} key - key corresponding to which response to be saved in cache
   * @param {object} response - response object to be set in cache
   */
  saveResponseInCache(key, response) {
    return new Promise((resolve, reject) => {
      logger.info(`saving response to cache`);
      logger.info(`cache key: ${key}`);
      if(response) {
        response.cached = true;
      }
      this.client
        .set(key, JSON.stringify(response))
        .then(() => {
          return this.client.expire(key, this.expiration);
        })
        .then(() => {
          resolve(new Response(201, 'response saved to cache successfully', response));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * @description - deleted response in cache if it isn't there
   * @param {string} substr - substring of key to be deleted from cache
   */
  deleteFromCache(substr) {
    return new Promise((resolve, reject) => {
      this.getSimilarKey(substr)
        .then((keys) => {
          if(keys.length) {
            logger.info(`deleting response from cache`);
            logger.info(`deleted keys: `);
            console.log(keys);
            return Promise.all[keys.map(key => this.client.del(key))];
          } else {
            return new Promise((resolve) => resolve(true));
          }
        })
        .then((response) => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * @description - find if similar key exists in cache
   * @param {string} substr - substring to be searched inside keys
   */
  getSimilarKey(substr) {
    return new Promise((resolve, reject) => {
      this.client
        .keys('*')
        .then((keys) => {
          let exists = [];
          for (const key of keys) {
            if(key.includes(substr)) {
              exists.push(key);
            }
          }
          resolve(exists);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

exports.RedisCache = RedisCache;
