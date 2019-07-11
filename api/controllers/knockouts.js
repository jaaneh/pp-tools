const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');
const fs = require('fs');
const mongoose = require('mongoose');

const Knockouts = require('../../models/knockouts');
const pos = require('../../utils/genImage/knockouts');

function replaceZero(obj) {
	const replacer = (key, value) => (value === 0 || value === '0' ? '' : value);
	Object.keys(obj).forEach(key => obj[key] == 0 && delete obj[key]);
	return JSON.parse(JSON.stringify(obj, replacer));
}

// GET /knockouts
exports.get_knockouts = (req, res, next) => {
	Knockouts.findOne({ user_id: req.user.userId })
		.exec()
		.then(stats => {
			res.status(200).json({
				success: { message: stats }
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});
};

// POST /knockouts
exports.post_knockouts = async (req, res, next) => {
	Knockouts.findOneAndUpdate({ user_id: req.user.userId }, { new: true })
		.exec()
		.then(stats => {
			if (!stats) {
				const knockouts = new Knockouts({
					_id: mongoose.Types.ObjectId(),
					user_id: req.user.userId,
					last_updated: new Date().getTime(),
					knockouts: req.body.knockouts
				});
				knockouts.save();
			} else {
				stats.last_updated = new Date().getTime();
				stats.knockouts = req.body.knockouts;
				stats.save();
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});

	const newBody = await replaceZero(req.body.knockouts);
	const outDir = await fs.createWriteStream(`api/images/knockouts/${req.user.userId}.png`);
	const glove = await loadImage(__dirname + '/../images/stocks/knockouts/glove.png');
	const objKeys = await Object.keys(newBody);

	let keys = [];
	objKeys.forEach(key => {
		keys.push(key);
	});

	loadImage(__dirname + '/../images/stocks/knockouts/knockouts.png').then(background => {
		ctx.drawImage(background, 0, 0);
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#000';
		ctx.shadowBlur = 5;
		ctx.shadowColor = '#000';
		ctx.font = 'bold 32px Tahoma';
		ctx.fillStyle = '#FFD578';

		for (let i = 0; i < keys.length; i++) {
			const name = keys[i];
			ctx.strokeText(newBody[name], pos[name].text_x, pos[name].text_y);
			ctx.fillText(newBody[name], pos[name].text_x, pos[name].text_y);
			loadImage(__dirname + `/../images/stocks/knockouts/${name}.png`).then(player => {
				ctx.drawImage(player, pos[name].face_x, pos[name].face_y);
				ctx.drawImage(glove, pos[name].glove_x, pos[name].glove_y);
			});
		}

		const stream = canvas.createPNGStream();
		stream.pipe(outDir);

		outDir.path = outDir.path.substring(4);

		outDir.on('finish', () => {
			res.status(200).json({
				imgUrl: outDir.path
			});
		});
	});
};
