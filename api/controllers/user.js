const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

function createTokenSendResponse(user, res, next) {
	const payload = {
		username: user.username,
		isAdmin: user.isAdmin,
		userId: user._id
	};
	jwt.sign(
		payload,
		process.env.JWT_KEY,
		{
			expiresIn: '12h'
		},
		(err, token) => {
			if (err) console.log(err);
			res.status(200).json({
				token: token
			});
		}
	);
}

// POST /user/signup
exports.user_signup = (req, res, next) => {
	User.find({ username: req.body.username })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					error: { message: 'User already exists' }
				});
			} else {
				bcrypt.hash(req.body.password.trim(), 12).then(hash => {
					const user = new User({
						_id: mongoose.Types.ObjectId(),
						username: req.body.username,
						password: hash,
						isAdmin: false,
						signed_up: req.body.signed_up,
						last_login: req.body.signed_up
					});
					user
						.save()
						.then(result => {
							createTokenSendResponse(result, res, next);
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});
};

// POST /user/login
exports.users_login = (req, res, next) => {
	User.findOneAndUpdate({ username: req.body.username }, { new: true })
		.then(user => {
			if (user) {
				user.last_login = req.body.last_login;
				user.save();
				bcrypt.compare(req.body.password, user.password).then(result => {
					if (result) {
						createTokenSendResponse(user, res, next);
					} else {
						return res.status(401).json({
							error: { message: 'Not Authorized' }
						});
					}
				});
			} else {
				res.status(401).json({
					error: { message: 'Not Authorized' }
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});
};

// GET /user
exports.users_get_me = (req, res, next) => {
	res.json({
		user: req.user
	});
};

// GET /user/getAll
exports.users_get_all = (req, res, next) => {
	User.find()
		.exec()
		.then(docs => {
			res.status(200).json({
				all_users: docs
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});
};

// POST /user/delete
exports.users_delete_user = (req, res, next) => {
	User.findOneAndDelete({ _id: req.body.userId })
		.exec()
		.then(result => {
			res.status(200).json({
				success: { message: 'User deleted' }
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});
};

exports.users_update_user = (req, res, next) => {
	User.findOneAndUpdate({ _id: req.body.userId }, { new: true })
		.exec()
		.then(user => {
			if (user) {
				user.username = req.body.username;
				user.isAdmin = req.body.isAdmin;
				user.save();
				res.status(200).json({
					success: { message: 'User Updated' }
				});
			} else {
				res.status(401).json({
					error: { message: 'Not Authorized' }
				});
			}
		});
};
