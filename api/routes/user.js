const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

// Controller
const userController = require('../controllers/user');

// Routes
router.post('/signup', userController.user_signup);
router.post('/login', userController.users_login);
router.get('/', userController.users_get_me);
router.get('/getAll', checkAuth.isAdmin, userController.users_get_all);
router.post('/delete', checkAuth.isAdmin, userController.users_delete_user);
router.post('/editUser', checkAuth.isAdmin, userController.users_update_user);

module.exports = router;
