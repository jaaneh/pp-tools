const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkTokenSetUser(req, res, next) {
	const authHeader = req.get('Authorization');
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		if (token) {
			jwt.verify(token, process.env.JWT_KEY, (err, user) => {
				if (err) {
					return res.status(401).json({
						error: { message: 'Not Authorized' }
					});
				}
				req.user = user;
				next();
			});
		} else {
			next();
		}
	} else {
		next();
	}
}

function isLoggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.status(401).json({
			error: { message: 'Not Authorized' }
		});
	}
}

module.exports = {
	checkTokenSetUser,
	isLoggedIn
};
