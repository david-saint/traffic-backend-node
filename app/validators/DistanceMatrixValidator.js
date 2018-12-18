const Joi = require('joi');

const schema = Joi.object().keys({
  originLat: Joi.number().required(),
  originLong: Joi.number().required(),
  destinationLat: Joi.number().required(),
  destinationLong: Joi.number().required(),
});

module.exports = schema;
