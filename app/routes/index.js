const express = require('express');
const { catchErrors } = require('./handlers/errorHandler');
const { distanceMatrix } = require('../controllers/GoogleController');

const router = express.Router();

// Liat of accepted routes
router.get('/', (req, res) => res.send('hello'));
router.post('/', catchErrors(distanceMatrix));

module.exports = router;
