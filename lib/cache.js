const logger = require('../init/logger').logger;
/**
 * @description - Class for caching the response
 * @param {object} req - request object
 */
class Cache {
  client;
  key;
  expiration;
  appId;

  /**
   * @constructor
   * @param {object} req - request object
   * @param {number} expiration - time after which the cache data should expire
   */
  constructor(req, expiration = 3600) {
    this.client = req.app.redisClient;
    this.appId = req.userData.wacId;
    this.expiration = expiration;
    this.key = req.userData.wacId + req.originalUrl;
  }
  /**
   * @description - checks if the response is cached
   */
  isResponseCached() {
    return new Promise((resolve, reject) => {
      this.client
        .exists(this.key)
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
   */
  getCachedResponse() {
    return new Promise((resolve) => {
      this.client
        .get(this.key)
        .then((response) => {
          if(response) {
            logger.info(`getting response from cache`);
          }
          resolve(JSON.parse(response));
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
  /**
   * @description - save response in cache if it isn't there
   * @param {object} response - response object to be set in cache
   */
  saveResponseInCache(response) {
    return new Promise((resolve, reject) => {
      response.cached = true;
      logger.info(`saving response to cache`);
      this.client
        .set(this.key, JSON.stringify(response))
        .then(() => {
          return this.client.expire(this.key, this.expiration);
        })
        .then(() => {
          resolve(true);
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
  deleteFromCache(substr = this.key) {
    logger.info(`deleting response from cache`);
    return new Promise((resolve, reject) => {
      this.getSimilarKey(substr)
        .then((keys) => {
          if(keys.length) {
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
            if(key.includes(this.appId + '/' + substr)) {
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

exports.Cache = Cache;
