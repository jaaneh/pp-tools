const express = require('express');
const router = express.Router();

// Controller
const knockoutsController = require('../controllers/knockouts');

// Routes
router.get('/', knockoutsController.get_knockouts);
router.post('/', knockoutsController.post_knockouts);

module.exports = router;
