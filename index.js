const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const app = express();

const middlewares = require('./api/middleware/check-auth');

mongoose.connect(process.env.MONGODB_URL_1 + process.env.MONGODB_PASS + process.env.MONGODB_URL_2, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(middlewares.checkTokenSetUser);
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client/build/'));
app.use('/images', express.static(__dirname + '/api/images'));

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './file_uploads/');
	},
	filename(req, file, cb) {
		cb(null, `${new Date().getTime()}_${file.originalname}`);
	}
});

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024
	}
});

const csvSubmitRutes = require('./api/routes/csvSubmit');
const userRoutes = require('./api/routes/user');
const knockoutsRoutes = require('./api/routes/knockouts');
const specialEventsRoutes = require('./api/routes/specialEvents');
const achievementsRoutes = require('./api/routes/achievements');
const homegamesRoutes = require('./api/routes/homegames');

app.get('/', (req, res) => {
	res.json({ message: 'Hello!', user: req.user });
});
app.use('/api/v1/csv-submit', upload.any(), csvSubmitRutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/knockouts', middlewares.isLoggedIn, knockoutsRoutes);
app.use('/api/v1/specialEvents', middlewares.isLoggedIn, specialEventsRoutes);
app.use('/api/v1/achievements', middlewares.isLoggedIn, achievementsRoutes);
app.use('/api/v1/homegames', middlewares.isLoggedIn, homegamesRoutes);

// Catch-all.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 3001, () => console.log(`Server listening on http://localhost:${port}/`));
