const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');
const fs = require('fs');
const mongoose = require('mongoose');

const SpecialEvent = require('../../models/specialEvent');
const pos = require('../../utils/genImage/specialEvents');

function replaceZero(obj) {
	const replacer = (key, value) => (value === 0 || value === '0' ? '' : value);
	Object.keys(obj).forEach(key => obj[key] == 0 && delete obj[key]);
	return JSON.parse(JSON.stringify(obj, replacer));
}

// GET /specialEvents
exports.get_specialevents = (req, res, next) => {
	SpecialEvent.findOne({ user_id: req.user.userId })
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

// POST /specialEvents
exports.post_specialevents = async (req, res, next) => {
	SpecialEvent.findOneAndUpdate({ user_id: req.user.userId }, { new: true })
		.exec()
		.then(stats => {
			if (!stats) {
				const specialEvent = new SpecialEvent({
					_id: mongoose.Types.ObjectId(),
					user_id: req.user.userId,
					last_updated: new Date().getTime(),
					specialEvent: req.body.specialEvent
				});
				specialEvent.save();
			} else {
				stats.last_updated = new Date().getTime();
				stats.specialEvent = req.body.specialEvent;
				stats.save();
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});

	const newBody = await replaceZero(req.body.specialEvent);
	const outDir = await fs.createWriteStream(`api/images/specialEvents/${req.user.userId}.png`);

	const finalTable = await loadImage(__dirname + '/../images/stocks/special_events/final_table.png');
	const bronzeMedal = await loadImage(__dirname + '/../images/stocks/special_events/bronze_medal.png');
	const silverMedal = await loadImage(__dirname + '/../images/stocks/special_events/silver_medal.png');
	const trophy = await loadImage(__dirname + '/../images/stocks/special_events/trophy.png');
	const objKeys = await Object.keys(newBody);
	const tournaments = [ 'powerfest', 'monsterseries', 'koseries', 'omahaseries', 'millionsonline' ];

	let keys = [];
	objKeys.forEach(key => {
		keys.push(key);
	});

	loadImage('api/images/stocks/special_events/specialevents.png').then(background => {
		ctx.drawImage(background, 0, 0);

		let tName;
		for (let i = 0; i < tournaments.length; i++) {
			const name = tournaments[i];

			ctx.lineWidth = 4;
			ctx.shadowBlur = 5;
			ctx.strokeStyle = '#000';
			ctx.shadowColor = '#000';
			ctx.font = 'bold 38px Tahoma';
			ctx.fillStyle = '#FFD578';

			if (name === 'powerfest') tName = 'powerfest';
			if (name === 'monsterseries') tName = 'monster';
			if (name === 'koseries') tName = 'ko';
			if (name === 'omahaseries') tName = 'omaha';
			if (name === 'millionsonline') tName = 'millions';

			if (newBody[name]) {
				ctx.strokeText(newBody[name], pos[name].pos_text_x, pos[name].pos_text_y);
				ctx.fillText(newBody[name], pos[name].pos_text_x, pos[name].pos_text_y);
			}
			if (keys.includes(`${tName}FtAmt`)) {
				ctx.drawImage(finalTable, pos[name].ft_x, pos[name].ft_y);
				ctx.strokeText(newBody[`${tName}FtAmt`], pos[name].ft_text_x, pos[name].ft_text_y);
				ctx.fillText(newBody[`${tName}FtAmt`], pos[name].ft_text_x, pos[name].ft_text_y);
			}
			if (keys.includes(`${tName}Bronze`)) ctx.drawImage(bronzeMedal, pos[name].bronze_x, pos[name].bronze_y);
			if (keys.includes(`${tName}Silver`)) ctx.drawImage(silverMedal, pos[name].silver_x, pos[name].silver_y);
			if (keys.includes(`${tName}Trophy`)) ctx.drawImage(trophy, pos[name].trophy_x, pos[name].trophy_y);

			ctx.lineWidth = 2;
			ctx.lineWidth = 1;
			ctx.shadowBlur = 2;
			ctx.font = 'bold 32px Tahoma';
			ctx.fillStyle = '#FFFFFF';

			if (keys.includes(`${tName}BronzeAmt`) && newBody[`${tName}BronzeAmt`] > 1) {
				ctx.strokeText(newBody[`${tName}BronzeAmt`], pos[name].bronze_amt_x, pos[name].bronze_amt_y);
				ctx.fillText(newBody[`${tName}BronzeAmt`], pos[name].bronze_amt_x, pos[name].bronze_amt_y);
			}
			if (keys.includes(`${tName}SilverAmt`) && newBody[`${tName}SilverAmt`] > 1) {
				ctx.strokeText(newBody[`${tName}SilverAmt`], pos[name].silver_amt_x, pos[name].silver_amt_y);
				ctx.fillText(newBody[`${tName}SilverAmt`], pos[name].silver_amt_x, pos[name].silver_amt_y);
			}
			if (keys.includes(`${tName}TrophyAmt`) && newBody[`${tName}TrophyAmt`] > 1) {
				ctx.strokeText(newBody[`${tName}TrophyAmt`], pos[name].trophy_amt_x, pos[name].trophy_amt_y);
				ctx.fillText(newBody[`${tName}TrophyAmt`], pos[name].trophy_amt_x, pos[name].trophy_amt_y);
			}
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
