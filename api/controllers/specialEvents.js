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
	SpecialEvent.findOneAndUpdate({ user_id: req.user.userId })
		.exec()
		.then(stats => {
			if (!stats) {
				const specialEvent = new SpecialEvent({
					_id: mongoose.Types.ObjectId(),
					user_id: req.user.userId,
					last_updated: new Date().getTime(),
					powerfest: req.body.powerfest || 0,
					powerfestFtAmt: req.body.powerfestFtAmt || 0,
					powerfestBronze: req.body.powerfestBronze || false,
					powerfestSilver: req.body.powerfestSilver || false,
					powerfestTrophy: req.body.powerfestTrophy || false,
					monsterseries: req.body.monsterseries || 0,
					monsterFtAmt: req.body.monsterFtAmt || 0,
					monsterBronze: req.body.monsterBronze || false,
					monsterSilver: req.body.monsterSilver || false,
					monsterTrophy: req.body.monsterTrophy || false,
					koseries: req.body.koseries || 0,
					koFtAmt: req.body.koFtAmt || 0,
					koBronze: req.body.koBronze || false,
					koSilver: req.body.koSilver || false,
					koTrophy: req.body.koTrophy || false,
					omahaseries: req.body.omahaseries || 0,
					omahaFtAmt: req.body.omahaFtAmt || 0,
					omahaBronze: req.body.omahaBronze || false,
					omahaSilver: req.body.omahaSilver || false,
					omahaTrophy: req.body.omahaTrophy || false,
					millionsonline: req.body.millionsonline || 0,
					millionsFtAmt: req.body.millionsFtAmt || 0,
					millionsBronze: req.body.millionsBronze || false,
					millionsSilver: req.body.millionsSilver || false,
					millionsTrophy: req.body.millionsTrophy || false
				});
				specialEvent.save();
			} else {
				stats.last_updated = new Date().getTime();
				stats.powerfest = req.body.powerfest || 0;
				stats.powerfestFtAmt = req.body.powerfestFtAmt || 0;
				stats.powerfestBronze = req.body.powerfestBronze || false;
				stats.powerfestSilver = req.body.powerfestSilver || false;
				stats.powerfestTrophy = req.body.powerfestTrophy || false;
				stats.monsterseries = req.body.monsterseries || 0;
				stats.monsterFtAmt = req.body.monsterFtAmt || 0;
				stats.monsterBronze = req.body.monsterBronze || false;
				stats.monsterSilver = req.body.monsterSilver || false;
				stats.monsterTrophy = req.body.monsterTrophy || false;
				stats.koseries = req.body.koseries || 0;
				stats.koFtAmt = req.body.koFtAmt || 0;
				stats.koBronze = req.body.koBronze || false;
				stats.koSilver = req.body.koSilver || false;
				stats.koTrophy = req.body.koTrophy || false;
				stats.omahaseries = req.body.omahaseries || 0;
				stats.omahaFtAmt = req.body.omahaFtAmt || 0;
				stats.omahaBronze = req.body.omahaBronze || false;
				stats.omahaSilver = req.body.omahaSilver || false;
				stats.omahaTrophy = req.body.omahaTrophy || false;
				stats.millionsonline = req.body.millionsonline || 0;
				stats.millionsFtAmt = req.body.millionsFtAmt || 0;
				stats.millionsBronze = req.body.millionsBronze || false;
				stats.millionsSilver = req.body.millionsSilver || false;
				stats.millionsTrophy = req.body.millionsTrophy || false;
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
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#000';
		ctx.shadowBlur = 5;
		ctx.shadowColor = '#000';
		ctx.font = 'bold 38px Tahoma';
		ctx.fillStyle = '#FFD578';

		let tName;
		for (let i = 0; i < tournaments.length; i++) {
			const name = tournaments[i];

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
