const mongoose = require('mongoose');

const knockoutsSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		user_id: String,
		last_updated: Number,
		matt_staples: Number,
		jeff_gross: Number,
		kristen_bicknell: Number,
		allinpav: Number,
		kevin_martin: Number,
		lui_martins: Number,
		anatoly_filatov: Number,
		hotted: Number,
		ryan_schoonbaert: Number,
		egption: Number,
		dramatic_degen: Number,
		courtiebee: Number,
		elky: Number,
		patrick_leonard: Number,
		heymonia: Number,
		dwstevie: Number,
		tonkaaaap: Number,
		isildur: Number,
		bencb: Number
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Knockouts', knockoutsSchema);
