const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
/**
 * @description - validates the objectId generated by mongodb
 * @param {string} id - id to be validated
 */
const isValidObjectId = (id) => {
  return !(Joi.objectId().validate(id).error)
}

exports.isValidObjectId = isValidObjectId;
