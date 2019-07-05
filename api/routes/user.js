const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

// Controller
const userController = require('../controllers/user');

// Routes
router.post('/signup', userController.user_signup);
router.post('/login', userController.users_login);
router.get('/', userController.users_get_me);
router.get('/getAll', checkAuth.isLoggedIn, userController.users_get_all);
router.get('/:userId', checkAuth.isLoggedIn, userController.users_get_user);
router.delete('/:userId', checkAuth.isLoggedIn, userController.users_delete_user);

module.exports = router;
