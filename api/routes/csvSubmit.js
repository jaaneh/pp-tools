const express = require('express');
const router = express.Router();

// Controller
const csvSubmitController = require('../controllers/csvSubmit');

// Routes
router.post('/', csvSubmitController.submit);

module.exports = router;
