const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');
const fs = require('fs');
const mongoose = require('mongoose');

const Achievement = require('../../models/achievement');
const pos = require('../../utils/genImage/achievement');

function replaceZero(obj) {
	const replacer = (key, value) => (value === 0 || value === '0' ? '' : value);
	Object.keys(obj).forEach(key => obj[key] == 0 && delete obj[key]);
	return JSON.parse(JSON.stringify(obj, replacer));
}

// GET /achievements
exports.get_achievements = (req, res, next) => {
	Achievement.findOne({ user_id: req.user.userId })
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

// POST /achievements
exports.post_achievements = async (req, res, next) => {
	Achievement.findOneAndUpdate({ user_id: req.user.userId }, { new: true })
		.exec()
		.then(stats => {
			if (!stats) {
				const achievemnet = new Achievement({
					_id: mongoose.Types.ObjectId(),
					user_id: req.user.userId,
					last_updated: new Date().getTime(),
					achievements: req.body.achievements
				});
				achievemnet.save();
			} else {
				stats.last_updated = new Date().getTime();
				stats.achievements = req.body.achievements;
				stats.save();
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});

	const newBody = await replaceZero(req.body.achievements);
	const outDir = await fs.createWriteStream(`api/images/achievements/${req.user.userId}.png`);

	const finalTable = await loadImage(__dirname + '/../images/stocks/achievements/final_table.png');
	const bronzeMedal = await loadImage(__dirname + '/../images/stocks/achievements/bronze_medal.png');
	const silverMedal = await loadImage(__dirname + '/../images/stocks/achievements/silver_medal.png');
	const trophy = await loadImage(__dirname + '/../images/stocks/achievements/trophy.png');
	const objKeys = await Object.keys(newBody);
	const tournaments = [
		'terminator530',
		'deepstack215',
		'gladiator320',
		'mmbounty215',
		'clasico530',
		'warmup82',
		'dailygrind109',
		'terminator109',
		'deepstack55',
		'gladiator55',
		'mmbounty55',
		'clasico109',
		'warmup22',
		'dailygrind33',
		'terminator33',
		'deepstack11',
		'gladiator11',
		'mmbounty11',
		'clasico33'
	];

	let keys = [];
	objKeys.forEach(key => {
		keys.push(key);
	});

	loadImage('api/images/stocks/achievements/achievements.png').then(background => {
		ctx.drawImage(background, 0, 0);

		for (let i = 0; i < tournaments.length; i++) {
			const name = tournaments[i];

			ctx.lineWidth = 4;
			ctx.shadowBlur = 5;
			ctx.strokeStyle = '#000';
			ctx.shadowColor = '#000';
			ctx.font = 'bold 28px Tahoma';
			ctx.fillStyle = '#FFD578';

			if (newBody[name]) {
				ctx.strokeText(newBody[name], pos[name].pos_text_x, pos[name].pos_text_y);
				ctx.fillText(newBody[name], pos[name].pos_text_x, pos[name].pos_text_y);
			}

			if (keys.includes(`${name}FtAmt`)) {
				ctx.lineWidth = 2.5;
				ctx.font = 'bold 22px Tahoma';
				ctx.drawImage(finalTable, pos[name].ft_x, pos[name].ft_y);
				ctx.strokeText(newBody[`${name}FtAmt`], pos[name].ft_text_x, pos[name].ft_text_y);
				ctx.fillText(newBody[`${name}FtAmt`], pos[name].ft_text_x, pos[name].ft_text_y);
			}

			ctx.lineWidth = 4;
			ctx.font = 'bold 28px Tahoma';

			if (keys.includes(`${name}Bronze`)) ctx.drawImage(bronzeMedal, pos[name].bronze_x, pos[name].bronze_y);
			if (keys.includes(`${name}Silver`)) ctx.drawImage(silverMedal, pos[name].silver_x, pos[name].silver_y);
			if (keys.includes(`${name}Trophy`)) ctx.drawImage(trophy, pos[name].trophy_x, pos[name].trophy_y);

			ctx.lineWidth = 2;
			ctx.lineWidth = 1;
			ctx.shadowBlur = 2;
			ctx.font = 'bold 20px Tahoma';
			ctx.fillStyle = '#FFFFFF';

			if (keys.includes(`${name}BronzeAmt`) && newBody[`${name}BronzeAmt`] > 1) {
				ctx.strokeText(newBody[`${name}BronzeAmt`], pos[name].bronze_amt_x, pos[name].bronze_amt_y);
				ctx.fillText(newBody[`${name}BronzeAmt`], pos[name].bronze_amt_x, pos[name].bronze_amt_y);
			}
			if (keys.includes(`${name}SilverAmt`) && newBody[`${name}SilverAmt`] > 1) {
				ctx.strokeText(newBody[`${name}SilverAmt`], pos[name].silver_amt_x, pos[name].silver_amt_y);
				ctx.fillText(newBody[`${name}SilverAmt`], pos[name].silver_amt_x, pos[name].silver_amt_y);
			}
			if (keys.includes(`${name}TrophyAmt`) && newBody[`${name}TrophyAmt`] > 1) {
				ctx.strokeText(newBody[`${name}TrophyAmt`], pos[name].trophy_amt_x, pos[name].trophy_amt_y);
				ctx.fillText(newBody[`${name}TrophyAmt`], pos[name].trophy_amt_x, pos[name].trophy_amt_y);
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
