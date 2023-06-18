const { Resource } = require('./resource');
const {WhatsAppBusinessApiSchema} = require('../models/multi-banner-ads');

/**
 * @class
 * @description - class for CRUD operations on Playlist
 * @property {object} req - request object for the route
 * @property {object} cache - instance of class Cache for cache management
 */
class WhatsAppBusinessApi extends Resource {
  #req;

  /**
   * @constructor
   * @param {string|null} resourceAuthId - appId for the resource
   * @param {object} req - request object of the route
   */
  constructor(resourceAuthId = null, req = null) {
    super(WhatsAppBusinessApiSchema, resourceAuthId);
    if (req) {
      this.#req = req;
    }
  }
}

exports.WhatsAppBusinessApi = WhatsAppBusinessApi;
