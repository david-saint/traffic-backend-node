const Joi = require('joi');
const GoogleMaps = require('@google/maps');
const DMValidator = require('../validators/DistanceMatrixValidator');


exports.distanceMatrix = (req, res) => {
  const Client = GoogleMaps.createClient({ key: process.env.GOOGLE_KEY, Promise });
  // Validate the request
  const { value, error } = Joi.validate(req.body, DMValidator);
  // if there's error return it
  if (error !== null) {
    return res.status(400).json(error);
  }
  console.log(value);
  // send the request
  return Client.distanceMatrix({
    origins: [{ lat: value.originLat, lng: value.originLong }],
    destinations: [{ lat: value.destinationLat, lng: value.destinationLong }],
    traffic_model: 'best_guess',
    departure_time: new Date(),
  })
    .asPromise()
    .then(response => res.json(response.json))
    .catch(err => res.status(500).json(err.json));
};
