const express = require('express');
const { distanceMatrix } = require('../controllers/GoogleController');
const { catchErrors } = require('./handlers/errorHandler');

const router = express.Router();

// Liat of accepted routes
router.get('/', (req, res) => res.send('hello'));
router.post('/', catchErrors(distanceMatrix));

module.exports = router;
