// src/routes/index.js

const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/sampleController');

// Define sample API route
router.get('/sample', sampleController.getSample);

module.exports = router;
