const mongoose = require('mongoose');

const specialEventSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		user_id: String,
		last_updated: Number,
		powerfest: Number,
		powerfestFtAmt: Number,
		powerfestBronze: Boolean,
		powerfestSilver: Boolean,
		powerfestTrophy: Boolean,
		monsterseries: Number,
		monsterFtAmt: Number,
		monsterBronze: Boolean,
		monsterSilver: Boolean,
		monsterTrophy: Boolean,
		koseries: Number,
		koFtAmt: Number,
		koBronze: Boolean,
		koSilver: Boolean,
		koTrophy: Boolean,
		omahaseries: Number,
		omahaFtAmt: Number,
		omahaBronze: Boolean,
		omahaSilver: Boolean,
		omahaTrophy: Boolean,
		millionsonline: Number,
		millionsFtAmt: Number,
		millionsBronze: Boolean,
		millionsSilver: Boolean,
		millionsTrophy: Boolean,
	},
	{ versionKey: false }
);

module.exports = mongoose.model('SpecialEvents', specialEventSchema);
