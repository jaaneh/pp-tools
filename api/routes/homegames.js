const express = require('express');
const router = express.Router();

// Controller
const homegamesController = require('../controllers/homegames');

// Routes
router.get('/', homegamesController.get_knockouts);
router.post('/', homegamesController.post_knockouts);

module.exports = router;
