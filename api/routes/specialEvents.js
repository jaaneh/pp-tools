const express = require('express');
const router = express.Router();

// Controller
const specialEventsController = require('../controllers/specialEvents');

// Routes
router.get('/', specialEventsController.get_specialevents);
router.post('/', specialEventsController.post_specialevents);

module.exports = router;
