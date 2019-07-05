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
	Achievement.findOneAndUpdate({ user_id: req.user.userId })
		.exec()
		.then(stats => {
			if (!stats) {
				const achievemnet = new Achievement({
					_id: mongoose.Types.ObjectId(),
					user_id: req.user.userId,
					last_updated: new Date().getTime(),
					terminator530: req.body.terminator530 || 0,
					terminator530FtAmt: req.body.terminator530FtAmt || 0,
					terminator530Bronze: req.body.terminator530Bronze || false,
					terminator530Silver: req.body.terminator530Silver || false,
					terminator530Trophy: req.body.terminator530Silver || false,
					deepstack215: req.body.deepstack215 || 0,
					deepstack215FtAmt: req.body.deepstack215FtAmt || 0,
					deepstack215Bronze: req.body.deepstack215Bronze || false,
					deepstack215Silver: req.body.deepstack215Silver || false,
					deepstack215Trophy: req.body.deepstack215Trophy || false,
					gladiator320: req.body.gladiator320 || 0,
					gladiator320FtAmt: req.body.gladiator320FtAmt || 0,
					gladiator320Bronze: req.body.gladiator320Bronze || false,
					gladiator320Silver: req.body.gladiator320Silver || false,
					gladiator320Trophy: req.body.gladiator320Trophy || false,
					mmbounty215: req.body.mmbounty215 || 0,
					mmbounty215FtAmt: req.body.mmbounty215FtAmt || 0,
					mmbounty215Bronze: req.body.mmbounty215Bronze || false,
					mmbounty215Silver: req.body.mmbounty215Silver || false,
					mmbounty215Trophy: req.body.mmbounty215Trophy || false,
					clasico530: req.body.clasico530 || 0,
					clasico530FtAmt: req.body.clasico530FtAmt || 0,
					clasico530Bronze: req.body.clasico530Bronze || false,
					clasico530Silver: req.body.clasico530Silver || false,
					clasico530Trophy: req.body.clasico530Trophy || false,
					warmup82: req.body.warmup82 || 0,
					warmup82FtAmt: req.body.warmup82FtAmt || 0,
					warmup82Bronze: req.body.warmup82Bronze || false,
					warmup82Silver: req.body.warmup82Silver || false,
					warmup82Trophy: req.body.warmup82Trophy || false,
					dailygrind109: req.body.dailygrind109 || 0,
					dailygrind109FtAmt: req.body.dailygrind109FtAmt || 0,
					dailygrind109Bronze: req.body.dailygrind109Bronze || false,
					dailygrind109Silver: req.body.dailygrind109Silver || false,
					dailygrind109Trophy: req.body.dailygrind109Trophy || false,
					terminator109: req.body.terminator109 || 0,
					terminator109FtAmt: req.body.terminator109FtAmt || 0,
					terminator109Bronze: req.body.terminator109Bronze || false,
					terminator109Silver: req.body.terminator109Silver || false,
					terminator109Trophy: req.body.terminator109Trophy || false,
					deepstack55: req.body.deepstack55 || 0,
					deepstack55FtAmt: req.body.deepstack55FtAmt || 0,
					deepstack55Bronze: req.body.deepstack55Bronze || false,
					deepstack55Silver: req.body.deepstack55Silver || false,
					deepstack55Trophy: req.body.deepstack55Trophy || false,
					gladiator55: req.body.gladiator55 || 0,
					gladiator55FtAmt: req.body.gladiator55FtAmt || 0,
					gladiator55Bronze: req.body.gladiator55Bronze || false,
					gladiator55Silver: req.body.gladiator55Silver || false,
					gladiator55Trophy: req.body.gladiator55Trophy || false,
					mmbounty55: req.body.mmbounty55 || 0,
					mmbounty55FtAmt: req.body.mmbounty55FtAmt || 0,
					mmbounty55Bronze: req.body.mmbounty55Bronze || false,
					mmbounty55Silver: req.body.mmbounty55Silver || false,
					mmbounty55Trophy: req.body.mmbounty55Trophy || false,
					clasico109: req.body.clasico109 || 0,
					clasico109FtAmt: req.body.clasico109FtAmt || 0,
					clasico109Bronze: req.body.clasico109Bronze || false,
					clasico109Silver: req.body.clasico109Silver || false,
					clasico109Trophy: req.body.clasico109Trophy || false,
					warmup22: req.body.warmup22 || 0,
					warmup22FtAmt: req.body.warmup22FtAmt || 0,
					warmup22Bronze: req.body.warmup22Bronze || false,
					warmup22Silver: req.body.warmup22Silver || false,
					warmup22Trophy: req.body.warmup22Trophy || false,
					dailygrind33: req.body.dailygrind33 || 0,
					dailygrind33FtAmt: req.body.dailygrind33FtAmt || 0,
					dailygrind33Bronze: req.body.dailygrind33Bronze || false,
					dailygrind33Silver: req.body.dailygrind33Silver || false,
					dailygrind33Trophy: req.body.dailygrind33Trophy || false,
					terminator33: req.body.terminator33 || 0,
					terminator33FtAmt: req.body.terminator33FtAmt || 0,
					terminator33Bronze: req.body.terminator33Bronze || false,
					terminator33Silver: req.body.terminator33Silver || false,
					terminator33Trophy: req.body.terminator33Trophy || false,
					deepstack11: req.body.deepstack11 || 0,
					deepstack11FtAmt: req.body.deepstack11FtAmt || 0,
					deepstack11Bronze: req.body.deepstack11Bronze || false,
					deepstack11Silver: req.body.deepstack11Silver || false,
					deepstack11Trophy: req.body.deepstack11Trophy || false,
					gladiator11: req.body.gladiator11 || 0,
					gladiator11FtAmt: req.body.gladiator11FtAmt || 0,
					gladiator11Bronze: req.body.gladiator11Bronze || false,
					gladiator11Silver: req.body.gladiator11Silver || false,
					gladiator11Trophy: req.body.gladiator11Trophy || false,
					mmbounty11: req.body.mmbounty11 || 0,
					mmbounty11FtAmt: req.body.mmbounty11FtAmt || 0,
					mmbounty11Bronze: req.body.mmbounty11Bronze || false,
					mmbounty11Silver: req.body.mmbounty11Silver || false,
					mmbounty11Trophy: req.body.mmbounty11Trophy || false,
					clasico33: req.body.clasico33 || 0,
					clasico33FtAmt: req.body.clasico33FtAmt || 0,
					clasico33Bronze: req.body.clasico33Bronze || false,
					clasico33Silver: req.body.clasico33Silver || false,
					clasico33Trophy: req.body.clasico33Trophy || false
				});
				achievemnet.save();
			} else {
				stats.last_updated = new Date().getTime();
				stats.terminator530 = req.body.terminator530 || 0;
				stats.terminator530FtAmt = req.body.terminator530FtAmt || 0;
				stats.terminator530Bronze = req.body.terminator530Bronze || false;
				stats.terminator530Silver = req.body.terminator530Silver || false;
				stats.terminator530Trophy = req.body.terminator530Silver || false;
				stats.deepstack215 = req.body.deepstack215 || 0;
				stats.deepstack215FtAmt = req.body.deepstack215FtAmt || 0;
				stats.deepstack215Bronze = req.body.deepstack215Bronze || false;
				stats.deepstack215Silver = req.body.deepstack215Silver || false;
				stats.deepstack215Trophy = req.body.deepstack215Trophy || false;
				stats.gladiator320 = req.body.gladiator320 || 0;
				stats.gladiator320FtAmt = req.body.gladiator320FtAmt || 0;
				stats.gladiator320Bronze = req.body.gladiator320Bronze || false;
				stats.gladiator320Silver = req.body.gladiator320Silver || false;
				stats.gladiator320Trophy = req.body.gladiator320Trophy || false;
				stats.mmbounty215 = req.body.mmbounty215 || 0;
				stats.mmbounty215FtAmt = req.body.mmbounty215FtAmt || 0;
				stats.mmbounty215Bronze = req.body.mmbounty215Bronze || false;
				stats.mmbounty215Silver = req.body.mmbounty215Silver || false;
				stats.mmbounty215Trophy = req.body.mmbounty215Trophy || false;
				stats.clasico530 = req.body.clasico530 || 0;
				stats.clasico530FtAmt = req.body.clasico530FtAmt || 0;
				stats.clasico530Bronze = req.body.clasico530Bronze || false;
				stats.clasico530Silver = req.body.clasico530Silver || false;
				stats.clasico530Trophy = req.body.clasico530Trophy || false;
				stats.warmup82 = req.body.warmup82 || 0;
				stats.warmup82FtAmt = req.body.warmup82FtAmt || 0;
				stats.warmup82Bronze = req.body.warmup82Bronze || false;
				stats.warmup82Silver = req.body.warmup82Silver || false;
				stats.warmup82Trophy = req.body.warmup82Trophy || false;
				stats.dailygrind109 = req.body.dailygrind109 || 0;
				stats.dailygrind109FtAmt = req.body.dailygrind109FtAmt || 0;
				stats.dailygrind109Bronze = req.body.dailygrind109Bronze || false;
				stats.dailygrind109Silver = req.body.dailygrind109Silver || false;
				stats.dailygrind109Trophy = req.body.dailygrind109Trophy || false;
				stats.terminator109 = req.body.terminator109 || 0;
				stats.terminator109FtAmt = req.body.terminator109FtAmt || 0;
				stats.terminator109Bronze = req.body.terminator109Bronze || false;
				stats.terminator109Silver = req.body.terminator109Silver || false;
				stats.terminator109Trophy = req.body.terminator109Trophy || false;
				stats.deepstack55 = req.body.deepstack55 || 0;
				stats.deepstack55FtAmt = req.body.deepstack55FtAmt || 0;
				stats.deepstack55Bronze = req.body.deepstack55Bronze || false;
				stats.deepstack55Silver = req.body.deepstack55Silver || false;
				stats.deepstack55Trophy = req.body.deepstack55Trophy || false;
				stats.gladiator55 = req.body.gladiator55 || 0;
				stats.gladiator55FtAmt = req.body.gladiator55FtAmt || 0;
				stats.gladiator55Bronze = req.body.gladiator55Bronze || false;
				stats.gladiator55Silver = req.body.gladiator55Silver || false;
				stats.gladiator55Trophy = req.body.gladiator55Trophy || false;
				stats.mmbounty55 = req.body.mmbounty55 || 0;
				stats.mmbounty55FtAmt = req.body.mmbounty55FtAmt || 0;
				stats.mmbounty55Bronze = req.body.mmbounty55Bronze || false;
				stats.mmbounty55Silver = req.body.mmbounty55Silver || false;
				stats.mmbounty55Trophy = req.body.mmbounty55Trophy || false;
				stats.clasico109 = req.body.clasico109 || 0;
				stats.clasico109FtAmt = req.body.clasico109FtAmt || 0;
				stats.clasico109Bronze = req.body.clasico109Bronze || false;
				stats.clasico109Silver = req.body.clasico109Silver || false;
				stats.clasico109Trophy = req.body.clasico109Trophy || false;
				stats.warmup22 = req.body.warmup22 || 0;
				stats.warmup22FtAmt = req.body.warmup22FtAmt || 0;
				stats.warmup22Bronze = req.body.warmup22Bronze || false;
				stats.warmup22Silver = req.body.warmup22Silver || false;
				stats.warmup22Trophy = req.body.warmup22Trophy || false;
				stats.dailygrind33 = req.body.dailygrind33 || 0;
				stats.dailygrind33FtAmt = req.body.dailygrind33FtAmt || 0;
				stats.dailygrind33Bronze = req.body.dailygrind33Bronze || false;
				stats.dailygrind33Silver = req.body.dailygrind33Silver || false;
				stats.dailygrind33Trophy = req.body.dailygrind33Trophy || false;
				stats.terminator33 = req.body.terminator33 || 0;
				stats.terminator33FtAmt = req.body.terminator33FtAmt || 0;
				stats.terminator33Bronze = req.body.terminator33Bronze || false;
				stats.terminator33Silver = req.body.terminator33Silver || false;
				stats.terminator33Trophy = req.body.terminator33Trophy || false;
				stats.deepstack11 = req.body.deepstack11 || 0;
				stats.deepstack11FtAmt = req.body.deepstack11FtAmt || 0;
				stats.deepstack11Bronze = req.body.deepstack11Bronze || false;
				stats.deepstack11Silver = req.body.deepstack11Silver || false;
				stats.deepstack11Trophy = req.body.deepstack11Trophy || false;
				stats.gladiator11 = req.body.gladiator11 || 0;
				stats.gladiator11FtAmt = req.body.gladiator11FtAmt || 0;
				stats.gladiator11Bronze = req.body.gladiator11Bronze || false;
				stats.gladiator11Silver = req.body.gladiator11Silver || false;
				stats.gladiator11Trophy = req.body.gladiator11Trophy || false;
				stats.mmbounty11 = req.body.mmbounty11 || 0;
				stats.mmbounty11FtAmt = req.body.mmbounty11FtAmt || 0;
				stats.mmbounty11Bronze = req.body.mmbounty11Bronze || false;
				stats.mmbounty11Silver = req.body.mmbounty11Silver || false;
				stats.mmbounty11Trophy = req.body.mmbounty11Trophy || false;
				stats.clasico33 = req.body.clasico33 || 0;
				stats.clasico33FtAmt = req.body.clasico33FtAmt || 0;
				stats.clasico33Bronze = req.body.clasico33Bronze || false;
				stats.clasico33Silver = req.body.clasico33Silver || false;
				stats.clasico33Trophy = req.body.clasico33Trophy || false;
				stats.save();
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: { message: err }
			});
		});

	const newBody = await replaceZero(req.body);
	// const time = new Date().getTime();
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
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#000';
		ctx.shadowBlur = 5;
		ctx.shadowColor = '#000';
		ctx.font = 'bold 28px Tahoma';
		ctx.fillStyle = '#FFD578';

		for (let i = 0; i < tournaments.length; i++) {
			const name = tournaments[i];

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
