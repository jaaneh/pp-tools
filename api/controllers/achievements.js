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
					terminator530Trophy: req.body.terminator530Trophy || false,
					terminator530BronzeAmt: req.body.terminator530BronzeAmt || 1,
					terminator530SilverAmt: req.body.terminator530SilverAmt || 1,
					terminator530TrophyAmt: req.body.terminator530TrophyAmt || 1,
					deepstack215: req.body.deepstack215 || 0,
					deepstack215FtAmt: req.body.deepstack215FtAmt || 0,
					deepstack215Bronze: req.body.deepstack215Bronze || false,
					deepstack215Silver: req.body.deepstack215Silver || false,
					deepstack215Trophy: req.body.deepstack215Trophy || false,
					deepstack215BronzeAmt: req.body.deepstack215BronzeAmt || 1,
					deepstack215SilverAmt: req.body.deepstack215SilverAmt || 1,
					deepstack215TrophyAmt: req.body.deepstack215TrophyAmt || 1,
					gladiator320: req.body.gladiator320 || 0,
					gladiator320FtAmt: req.body.gladiator320FtAmt || 0,
					gladiator320Bronze: req.body.gladiator320Bronze || false,
					gladiator320Silver: req.body.gladiator320Silver || false,
					gladiator320Trophy: req.body.gladiator320Trophy || false,
					gladiator320BronzeAmt: req.body.gladiator320BronzeAmt || 1,
					gladiator320SilverAmt: req.body.gladiator320SilverAmt || 1,
					gladiator320TrophyAmt: req.body.gladiator320TrophyAmt || 1,
					mmbounty215: req.body.mmbounty215 || 0,
					mmbounty215FtAmt: req.body.mmbounty215FtAmt || 0,
					mmbounty215Bronze: req.body.mmbounty215Bronze || false,
					mmbounty215Silver: req.body.mmbounty215Silver || false,
					mmbounty215Trophy: req.body.mmbounty215Trophy || false,
					mmbounty215BronzeAmt: req.body.mmbounty215BronzeAmt || 1,
					mmbounty215SilverAmt: req.body.mmbounty215SilverAmt || 1,
					mmbounty215TrophyAmt: req.body.mmbounty215TrophyAmt || 1,
					clasico530: req.body.clasico530 || 0,
					clasico530FtAmt: req.body.clasico530FtAmt || 0,
					clasico530Bronze: req.body.clasico530Bronze || false,
					clasico530Silver: req.body.clasico530Silver || false,
					clasico530Trophy: req.body.clasico530Trophy || false,
					clasico530BronzeAmt: req.body.clasico530BronzeAmt || 1,
					clasico530SilverAmt: req.body.clasico530SilverAmt || 1,
					clasico530TrophyAmt: req.body.clasico530TrophyAmt || 1,
					warmup82: req.body.warmup82 || 0,
					warmup82FtAmt: req.body.warmup82FtAmt || 0,
					warmup82Bronze: req.body.warmup82Bronze || false,
					warmup82Silver: req.body.warmup82Silver || false,
					warmup82Trophy: req.body.warmup82Trophy || false,
					warmup82BronzeAmt: req.body.warmup82BronzeAmt || 1,
					warmup82SilverAmt: req.body.warmup82SilverAmt || 1,
					warmup82TrophyAmt: req.body.warmup82TrophyAmt || 1,
					dailygrind109: req.body.dailygrind109 || 0,
					dailygrind109FtAmt: req.body.dailygrind109FtAmt || 0,
					dailygrind109Bronze: req.body.dailygrind109Bronze || false,
					dailygrind109Silver: req.body.dailygrind109Silver || false,
					dailygrind109Trophy: req.body.dailygrind109Trophy || false,
					dailygrind109BronzeAmt: req.body.dailygrind109BronzeAmt || 1,
					dailygrind109SilverAmt: req.body.dailygrind109SilverAmt || 1,
					dailygrind109TrophyAmt: req.body.dailygrind109TrophyAmt || 1,
					terminator109: req.body.terminator109 || 0,
					terminator109FtAmt: req.body.terminator109FtAmt || 0,
					terminator109Bronze: req.body.terminator109Bronze || false,
					terminator109Silver: req.body.terminator109Silver || false,
					terminator109Trophy: req.body.terminator109Trophy || false,
					terminator109BronzeAmt: req.body.terminator109BronzeAmt || 1,
					terminator109SilverAmt: req.body.terminator109SilverAmt || 1,
					terminator109TrophyAmt: req.body.terminator109TrophyAmt || 1,
					deepstack55: req.body.deepstack55 || 0,
					deepstack55FtAmt: req.body.deepstack55FtAmt || 0,
					deepstack55Bronze: req.body.deepstack55Bronze || false,
					deepstack55Silver: req.body.deepstack55Silver || false,
					deepstack55Trophy: req.body.deepstack55Trophy || false,
					deepstack55BronzeAmt: req.body.deepstack55BronzeAmt || 1,
					deepstack55SilverAmt: req.body.deepstack55SilverAmt || 1,
					deepstack55TrophyAmt: req.body.deepstack55TrophyAmt || 1,
					gladiator55: req.body.gladiator55 || 0,
					gladiator55FtAmt: req.body.gladiator55FtAmt || 0,
					gladiator55Bronze: req.body.gladiator55Bronze || false,
					gladiator55Silver: req.body.gladiator55Silver || false,
					gladiator55Trophy: req.body.gladiator55Trophy || false,
					gladiator55BronzeAmt: req.body.gladiator55BronzeAmt || 1,
					gladiator55SilverAmt: req.body.gladiator55SilverAmt || 1,
					gladiator55TrophyAmt: req.body.gladiator55TrophyAmt || 1,
					mmbounty55: req.body.mmbounty55 || 0,
					mmbounty55FtAmt: req.body.mmbounty55FtAmt || 0,
					mmbounty55Bronze: req.body.mmbounty55Bronze || false,
					mmbounty55Silver: req.body.mmbounty55Silver || false,
					mmbounty55Trophy: req.body.mmbounty55Trophy || false,
					mmbounty55BronzeAmt: req.body.mmbounty55BronzeAmt || 1,
					mmbounty55SilverAmt: req.body.mmbounty55SilverAmt || 1,
					mmbounty55TrophyAmt: req.body.mmbounty55TrophyAmt || 1,
					clasico109: req.body.clasico109 || 0,
					clasico109FtAmt: req.body.clasico109FtAmt || 0,
					clasico109Bronze: req.body.clasico109Bronze || false,
					clasico109Silver: req.body.clasico109Silver || false,
					clasico109Trophy: req.body.clasico109Trophy || false,
					clasico109BronzeAmt: req.body.clasico109BronzeAmt || 1,
					clasico109SilverAmt: req.body.clasico109SilverAmt || 1,
					clasico109TrophyAmt: req.body.clasico109TrophyAmt || 1,
					warmup22: req.body.warmup22 || 0,
					warmup22FtAmt: req.body.warmup22FtAmt || 0,
					warmup22Bronze: req.body.warmup22Bronze || false,
					warmup22Silver: req.body.warmup22Silver || false,
					warmup22Trophy: req.body.warmup22Trophy || false,
					warmup22BronzeAmt: req.body.warmup22BronzeAmt || 1,
					warmup22SilverAmt: req.body.warmup22SilverAmt || 1,
					warmup22TrophyAmt: req.body.warmup22TrophyAmt || 1,
					dailygrind33: req.body.dailygrind33 || 0,
					dailygrind33FtAmt: req.body.dailygrind33FtAmt || 0,
					dailygrind33Bronze: req.body.dailygrind33Bronze || false,
					dailygrind33Silver: req.body.dailygrind33Silver || false,
					dailygrind33Trophy: req.body.dailygrind33Trophy || false,
					dailygrind33BronzeAmt: req.body.dailygrind33BronzeAmt || 1,
					dailygrind33SilverAmt: req.body.dailygrind33SilverAmt || 1,
					dailygrind33TrophyAmt: req.body.dailygrind33TrophyAmt || 1,
					terminator33: req.body.terminator33 || 0,
					terminator33FtAmt: req.body.terminator33FtAmt || 0,
					terminator33Bronze: req.body.terminator33Bronze || false,
					terminator33Silver: req.body.terminator33Silver || false,
					terminator33Trophy: req.body.terminator33Trophy || false,
					terminator33BronzeAmt: req.body.terminator33BronzeAmt || 1,
					terminator33SilverAmt: req.body.terminator33SilverAmt || 1,
					terminator33TrophyAmt: req.body.terminator33TrophyAmt || 1,
					deepstack11: req.body.deepstack11 || 0,
					deepstack11FtAmt: req.body.deepstack11FtAmt || 0,
					deepstack11Bronze: req.body.deepstack11Bronze || false,
					deepstack11Silver: req.body.deepstack11Silver || false,
					deepstack11Trophy: req.body.deepstack11Trophy || false,
					deepstack11BronzeAmt: req.body.deepstack11BronzeAmt || 1,
					deepstack11SilverAmt: req.body.deepstack11SilverAmt || 1,
					deepstack11TrophyAmt: req.body.deepstack11TrophyAmt || 1,
					gladiator11: req.body.gladiator11 || 0,
					gladiator11FtAmt: req.body.gladiator11FtAmt || 0,
					gladiator11Bronze: req.body.gladiator11Bronze || false,
					gladiator11Silver: req.body.gladiator11Silver || false,
					gladiator11Trophy: req.body.gladiator11Trophy || false,
					gladiator11BronzeAmt: req.body.gladiator11BronzeAmt || 1,
					gladiator11SilverAmt: req.body.gladiator11SilverAmt || 1,
					gladiator11TrophyAmt: req.body.gladiator11TrophyAmt || 1,
					mmbounty11: req.body.mmbounty11 || 0,
					mmbounty11FtAmt: req.body.mmbounty11FtAmt || 0,
					mmbounty11Bronze: req.body.mmbounty11Bronze || false,
					mmbounty11Silver: req.body.mmbounty11Silver || false,
					mmbounty11Trophy: req.body.mmbounty11Trophy || false,
					mmbounty11BronzeAmt: req.body.mmbounty11BronzeAmt || 1,
					mmbounty11SilverAmt: req.body.mmbounty11SilverAmt || 1,
					mmbounty11TrophyAmt: req.body.mmbounty11TrophyAmt || 1,
					clasico33: req.body.clasico33 || 0,
					clasico33FtAmt: req.body.clasico33FtAmt || 0,
					clasico33Bronze: req.body.clasico33Bronze || false,
					clasico33Silver: req.body.clasico33Silver || false,
					clasico33Trophy: req.body.clasico33Trophy || false,
					clasico33BronzeAmt: req.body.clasico33BronzeAmt || 1,
					clasico33SilverAmt: req.body.clasico33SilverAmt || 1,
					clasico33TrophyAmt: req.body.clasico33TrophyAmt || 1
				});
				achievemnet.save();
			} else {
				stats.last_updated = new Date().getTime();
				stats.terminator530 = req.body.terminator530 || 0;
				stats.terminator530FtAmt = req.body.terminator530FtAmt || 0;
				stats.terminator530Bronze = req.body.terminator530Bronze || false;
				stats.terminator530Silver = req.body.terminator530Silver || false;
				stats.terminator530Trophy = req.body.terminator530Trophy || false;
				stats.terminator530BronzeAmt = req.body.terminator530BronzeAmt || 1;
				stats.terminator530SilverAmt = req.body.terminator530SilverAmt || 1;
				stats.terminator530TrophyAmt = req.body.terminator530TrophyAmt || 1;
				stats.deepstack215 = req.body.deepstack215 || 0;
				stats.deepstack215FtAmt = req.body.deepstack215FtAmt || 0;
				stats.deepstack215Bronze = req.body.deepstack215Bronze || false;
				stats.deepstack215Silver = req.body.deepstack215Silver || false;
				stats.deepstack215Trophy = req.body.deepstack215Trophy || false;
				stats.deepstack215BronzeAmt = req.body.deepstack215BronzeAmt || 1;
				stats.deepstack215SilverAmt = req.body.deepstack215SilverAmt || 1;
				stats.deepstack215TrophyAmt = req.body.deepstack215TrophyAmt || 1;
				stats.gladiator320 = req.body.gladiator320 || 0;
				stats.gladiator320FtAmt = req.body.gladiator320FtAmt || 0;
				stats.gladiator320Bronze = req.body.gladiator320Bronze || false;
				stats.gladiator320Silver = req.body.gladiator320Silver || false;
				stats.gladiator320Trophy = req.body.gladiator320Trophy || false;
				stats.gladiator320BronzeAmt = req.body.gladiator320BronzeAmt || 1;
				stats.gladiator320SilverAmt = req.body.gladiator320SilverAmt || 1;
				stats.gladiator320TrophyAmt = req.body.gladiator320TrophyAmt || 1;
				stats.mmbounty215 = req.body.mmbounty215 || 0;
				stats.mmbounty215FtAmt = req.body.mmbounty215FtAmt || 0;
				stats.mmbounty215Bronze = req.body.mmbounty215Bronze || false;
				stats.mmbounty215Silver = req.body.mmbounty215Silver || false;
				stats.mmbounty215Trophy = req.body.mmbounty215Trophy || false;
				stats.mmbounty215BronzeAmt = req.body.mmbounty215BronzeAmt || 1;
				stats.mmbounty215SilverAmt = req.body.mmbounty215SilverAmt || 1;
				stats.mmbounty215TrophyAmt = req.body.mmbounty215TrophyAmt || 1;
				stats.clasico530 = req.body.clasico530 || 0;
				stats.clasico530FtAmt = req.body.clasico530FtAmt || 0;
				stats.clasico530Bronze = req.body.clasico530Bronze || false;
				stats.clasico530Silver = req.body.clasico530Silver || false;
				stats.clasico530Trophy = req.body.clasico530Trophy || false;
				stats.clasico530BronzeAmt = req.body.clasico530BronzeAmt || 1;
				stats.clasico530SilverAmt = req.body.clasico530SilverAmt || 1;
				stats.clasico530TrophyAmt = req.body.clasico530TrophyAmt || 1;
				stats.warmup82 = req.body.warmup82 || 0;
				stats.warmup82FtAmt = req.body.warmup82FtAmt || 0;
				stats.warmup82Bronze = req.body.warmup82Bronze || false;
				stats.warmup82Silver = req.body.warmup82Silver || false;
				stats.warmup82Trophy = req.body.warmup82Trophy || false;
				stats.warmup82BronzeAmt = req.body.warmup82BronzeAmt || 1;
				stats.warmup82SilverAmt = req.body.warmup82SilverAmt || 1;
				stats.warmup82TrophyAmt = req.body.warmup82TrophyAmt || 1;
				stats.dailygrind109 = req.body.dailygrind109 || 0;
				stats.dailygrind109FtAmt = req.body.dailygrind109FtAmt || 0;
				stats.dailygrind109Bronze = req.body.dailygrind109Bronze || false;
				stats.dailygrind109Silver = req.body.dailygrind109Silver || false;
				stats.dailygrind109Trophy = req.body.dailygrind109Trophy || false;
				stats.dailygrind109BronzeAmt = req.body.dailygrind109BronzeAmt || 1;
				stats.dailygrind109SilverAmt = req.body.dailygrind109SilverAmt || 1;
				stats.dailygrind109TrophyAmt = req.body.dailygrind109TrophyAmt || 1;
				stats.terminator109 = req.body.terminator109 || 0;
				stats.terminator109FtAmt = req.body.terminator109FtAmt || 0;
				stats.terminator109Bronze = req.body.terminator109Bronze || false;
				stats.terminator109Silver = req.body.terminator109Silver || false;
				stats.terminator109Trophy = req.body.terminator109Trophy || false;
				stats.terminator109BronzeAmt = req.body.terminator109BronzeAmt || 1;
				stats.terminator109SilverAmt = req.body.terminator109SilverAmt || 1;
				stats.terminator109TrophyAmt = req.body.terminator109TrophyAmt || 1;
				stats.deepstack55 = req.body.deepstack55 || 0;
				stats.deepstack55FtAmt = req.body.deepstack55FtAmt || 0;
				stats.deepstack55Bronze = req.body.deepstack55Bronze || false;
				stats.deepstack55Silver = req.body.deepstack55Silver || false;
				stats.deepstack55Trophy = req.body.deepstack55Trophy || false;
				stats.deepstack55BronzeAmt = req.body.deepstack55BronzeAmt || 1;
				stats.deepstack55SilverAmt = req.body.deepstack55SilverAmt || 1;
				stats.deepstack55TrophyAmt = req.body.deepstack55TrophyAmt || 1;
				stats.gladiator55 = req.body.gladiator55 || 0;
				stats.gladiator55FtAmt = req.body.gladiator55FtAmt || 0;
				stats.gladiator55Bronze = req.body.gladiator55Bronze || false;
				stats.gladiator55Silver = req.body.gladiator55Silver || false;
				stats.gladiator55Trophy = req.body.gladiator55Trophy || false;
				stats.gladiator55BronzeAmt = req.body.gladiator55BronzeAmt || 1;
				stats.gladiator55SilverAmt = req.body.gladiator55SilverAmt || 1;
				stats.gladiator55TrophyAmt = req.body.gladiator55TrophyAmt || 1;
				stats.mmbounty55 = req.body.mmbounty55 || 0;
				stats.mmbounty55FtAmt = req.body.mmbounty55FtAmt || 0;
				stats.mmbounty55Bronze = req.body.mmbounty55Bronze || false;
				stats.mmbounty55Silver = req.body.mmbounty55Silver || false;
				stats.mmbounty55Trophy = req.body.mmbounty55Trophy || false;
				stats.mmbounty55BronzeAmt = req.body.mmbounty55BronzeAmt || 1;
				stats.mmbounty55SilverAmt = req.body.mmbounty55SilverAmt || 1;
				stats.mmbounty55TrophyAmt = req.body.mmbounty55TrophyAmt || 1;
				stats.clasico109 = req.body.clasico109 || 0;
				stats.clasico109FtAmt = req.body.clasico109FtAmt || 0;
				stats.clasico109Bronze = req.body.clasico109Bronze || false;
				stats.clasico109Silver = req.body.clasico109Silver || false;
				stats.clasico109Trophy = req.body.clasico109Trophy || false;
				stats.clasico109BronzeAmt = req.body.clasico109BronzeAmt || 1;
				stats.clasico109SilverAmt = req.body.clasico109SilverAmt || 1;
				stats.clasico109TrophyAmt = req.body.clasico109TrophyAmt || 1;
				stats.warmup22 = req.body.warmup22 || 0;
				stats.warmup22FtAmt = req.body.warmup22FtAmt || 0;
				stats.warmup22Bronze = req.body.warmup22Bronze || false;
				stats.warmup22Silver = req.body.warmup22Silver || false;
				stats.warmup22Trophy = req.body.warmup22Trophy || false;
				stats.warmup22BronzeAmt = req.body.warmup22BronzeAmt || 1;
				stats.warmup22SilverAmt = req.body.warmup22SilverAmt || 1;
				stats.warmup22TrophyAmt = req.body.warmup22TrophyAmt || 1;
				stats.dailygrind33 = req.body.dailygrind33 || 0;
				stats.dailygrind33FtAmt = req.body.dailygrind33FtAmt || 0;
				stats.dailygrind33Bronze = req.body.dailygrind33Bronze || false;
				stats.dailygrind33Silver = req.body.dailygrind33Silver || false;
				stats.dailygrind33Trophy = req.body.dailygrind33Trophy || false;
				stats.dailygrind33BronzeAmt = req.body.dailygrind33BronzeAmt || 1;
				stats.dailygrind33SilverAmt = req.body.dailygrind33SilverAmt || 1;
				stats.dailygrind33TrophyAmt = req.body.dailygrind33TrophyAmt || 1;
				stats.terminator33 = req.body.terminator33 || 0;
				stats.terminator33FtAmt = req.body.terminator33FtAmt || 0;
				stats.terminator33Bronze = req.body.terminator33Bronze || false;
				stats.terminator33Silver = req.body.terminator33Silver || false;
				stats.terminator33Trophy = req.body.terminator33Trophy || false;
				stats.terminator33BronzeAmt = req.body.terminator33BronzeAmt || 1;
				stats.terminator33SilverAmt = req.body.terminator33SilverAmt || 1;
				stats.terminator33TrophyAmt = req.body.terminator33TrophyAmt || 1;
				stats.deepstack11 = req.body.deepstack11 || 0;
				stats.deepstack11FtAmt = req.body.deepstack11FtAmt || 0;
				stats.deepstack11Bronze = req.body.deepstack11Bronze || false;
				stats.deepstack11Silver = req.body.deepstack11Silver || false;
				stats.deepstack11Trophy = req.body.deepstack11Trophy || false;
				stats.deepstack11BronzeAmt = req.body.deepstack11BronzeAmt || 1;
				stats.deepstack11SilverAmt = req.body.deepstack11SilverAmt || 1;
				stats.deepstack11TrophyAmt = req.body.deepstack11TrophyAmt || 1;
				stats.gladiator11 = req.body.gladiator11 || 0;
				stats.gladiator11FtAmt = req.body.gladiator11FtAmt || 0;
				stats.gladiator11Bronze = req.body.gladiator11Bronze || false;
				stats.gladiator11Silver = req.body.gladiator11Silver || false;
				stats.gladiator11Trophy = req.body.gladiator11Trophy || false;
				stats.gladiator11BronzeAmt = req.body.gladiator11BronzeAmt || 1;
				stats.gladiator11SilverAmt = req.body.gladiator11SilverAmt || 1;
				stats.gladiator11TrophyAmt = req.body.gladiator11TrophyAmt || 1;
				stats.mmbounty11 = req.body.mmbounty11 || 0;
				stats.mmbounty11FtAmt = req.body.mmbounty11FtAmt || 0;
				stats.mmbounty11Bronze = req.body.mmbounty11Bronze || false;
				stats.mmbounty11Silver = req.body.mmbounty11Silver || false;
				stats.mmbounty11Trophy = req.body.mmbounty11Trophy || false;
				stats.mmbounty11BronzeAmt = req.body.mmbounty11BronzeAmt || 1;
				stats.mmbounty11SilverAmt = req.body.mmbounty11SilverAmt || 1;
				stats.mmbounty11TrophyAmt = req.body.mmbounty11TrophyAmt || 1;
				stats.clasico33 = req.body.clasico33 || 0;
				stats.clasico33FtAmt = req.body.clasico33FtAmt || 0;
				stats.clasico33Bronze = req.body.clasico33Bronze || false;
				stats.clasico33Silver = req.body.clasico33Silver || false;
				stats.clasico33Trophy = req.body.clasico33Trophy || false;
				stats.clasico33BronzeAmt = req.body.clasico33BronzeAmt || 1;
				stats.clasico33SilverAmt = req.body.clasico33SilverAmt || 1;
				stats.clasico33TrophyAmt = req.body.clasico33TrophyAmt || 1;
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
