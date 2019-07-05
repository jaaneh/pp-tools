const express = require('express');
const router = express.Router();

// Controller
const achievementsController = require('../controllers/achievements');

// Routes
router.get('/', achievementsController.get_achievements);
router.post('/', achievementsController.post_achievements);

module.exports = router;
