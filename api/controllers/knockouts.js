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
	Knockouts.findOneAndUpdate({ user_id: req.user.userId })
		.exec()
		.then(stats => {
			if (!stats) {
				const knockouts = new Knockouts({
					_id: mongoose.Types.ObjectId(),
					user_id: req.user.userId,
					last_updated: new Date().getTime(),
					matt_staples: req.body.mattstaples || 0,
					jeff_gross: req.body.jeffgross || 0,
					kristen_bicknell: req.body.kristenbicknell || 0,
					allinpav: req.body.allinpav || 0,
					kevin_martin: req.body.kevinmartin || 0,
					lui_martins: req.body.luimartins || 0,
					anatoly_filatov: req.body.anatolyfilatov || 0,
					hotted: req.body.hotted || 0,
					ryan_schoonbaert: req.body.ryanschoonbaert || 0,
					egption: req.body.egption || 0,
					dramatic_degen: req.body.dramaticdegen || 0,
					courtiebee: req.body.courtiebee || 0,
					elky: req.body.elky || 0,
					patrick_leonard: req.body.patrickleonard || 0,
					heymonia: req.body.heymonia || 0,
					dwstevie: req.body.dwstevie || 0,
					tonkaaaap: req.body.tonkaaaap || 0,
					isildur: req.body.isildur || 0,
					bencb: req.body.bencb || 0
				});
				knockouts.save();
			} else {
				stats.last_updated = new Date().getTime();
				stats.matt_staples = req.body.mattstaples || 0;
				stats.jeff_gross = req.body.jeffgross || 0;
				stats.kristen_bicknell = req.body.kristenbicknell || 0;
				stats.allinpav = req.body.allinpav || 0;
				stats.kevin_martin = req.body.kevinmartin || 0;
				stats.lui_martins = req.body.luimartins || 0;
				stats.anatoly_filatov = req.body.anatolyfilatov || 0;
				stats.hotted = req.body.hotted || 0;
				stats.ryan_schoonbaert = req.body.ryanschoonbaert || 0;
				stats.egption = req.body.egption || 0;
				stats.dramatic_degen = req.body.dramaticdegen || 0;
				stats.courtiebee = req.body.courtiebee || 0;
				stats.elky = req.body.elky || 0;
				stats.patrick_leonard = req.body.patrickleonard || 0;
				stats.heymonia = req.body.heymonia || 0;
				stats.dwstevie = req.body.dwstevie || 0;
				stats.tonkaaaap = req.body.tonkaaaap || 0;
				stats.isildur = req.body.isildur || 0;
				stats.bencb = req.body.bencb || 0;
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
