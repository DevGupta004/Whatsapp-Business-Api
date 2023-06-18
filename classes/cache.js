const axios = require('axios');
const { RedisCache } = require('./redis-cache');
/**
 * @class
 * @description - class for manipulation of cache
 * @property {string} appId
 * @property {string} route - route for which response will be cached
 */
class Cache extends RedisCache {
  appId;
  key;
  /**
   * @constructor
   * @param {object} req - request object to get the
   */
  constructor(req = null) {
    super(req);
    this.appId = req.userData.wacId;
    this.key = this.appId + req.originalUrl;
  }
  /**
   * @description - gets response from cache
   * @param {string} key -
   */
  get(key = '') {
    if(key) {
      key = key ? (this.appId + '/' + key) : key;
    }
    return this.getCachedResponse(key ? key : this.key);
  }
  /**
   * @description - saves response to cache
   * @param {object} response -
   * @param {string} key -
   */
  save(response, key = '') {
    if(this.appId) {
      if(key) {
        key = key ? (this.appId + '/' + key) : key;
      }
      return this.saveResponseInCache(key ? key : this.key, response);
    }
  }
  /**
   * @description - delete response for the provider
   * @param {string} key -
   */
  delete(key = '') {
    if(key) {
      key = key ? (this.appId + '/' + key) : key;
    }
    return this.deleteFromCache(key ? key : this.key);
  }

}

exports.Cache = Cache;
