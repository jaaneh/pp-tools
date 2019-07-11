const mongoose = require('mongoose');

const specialEventSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		user_id: String,
		last_updated: Number,
		specialEvent: {
			powerfest: { type: Number, default: 0 },
			powerfestFtAmt: { type: Number, default: 0 },
			powerfestBronze: { type: Boolean, default: false },
			powerfestSilver: { type: Boolean, default: false },
			powerfestTrophy: { type: Boolean, default: false },
			powerfestBronzeAmt: { type: Number, default: 1 },
			powerfestSilverAmt: { type: Number, default: 1 },
			powerfestTrophyAmt: { type: Number, default: 1 },
			monsterseries: { type: Number, default: 0 },
			monsterFtAmt: { type: Number, default: 0 },
			monsterBronze: { type: Boolean, default: false },
			monsterSilver: { type: Boolean, default: false },
			monsterTrophy: { type: Boolean, default: false },
			monsterBronzeAmt: { type: Number, default: 1 },
			monsterSilverAmt: { type: Number, default: 1 },
			monsterTrophyAmt: { type: Number, default: 1 },
			koseries: { type: Number, default: 0 },
			koFtAmt: { type: Number, default: 0 },
			koBronze: { type: Boolean, default: false },
			koSilver: { type: Boolean, default: false },
			koTrophy: { type: Boolean, default: false },
			koBronzeAmt: { type: Number, default: 1 },
			koSilverAmt: { type: Number, default: 1 },
			koTrophyAmt: { type: Number, default: 1 },
			omahaseries: { type: Number, default: 0 },
			omahaFtAmt: { type: Number, default: 0 },
			omahaBronze: { type: Boolean, default: false },
			omahaSilver: { type: Boolean, default: false },
			omahaTrophy: { type: Boolean, default: false },
			omahaBronzeAmt: { type: Number, default: 1 },
			omahaSilverAmt: { type: Number, default: 1 },
			omahaTrophyAmt: { type: Number, default: 1 },
			millionsonline: { type: Number, default: 0 },
			millionsFtAmt: { type: Number, default: 0 },
			millionsBronze: { type: Boolean, default: false },
			millionsSilver: { type: Boolean, default: false },
			millionsTrophy: { type: Boolean, default: false },
			millionsBronzeAmt: { type: Number, default: 1 },
			millionsSilverAmt: { type: Number, default: 1 },
			millionsTrophyAmt: { type: Number, default: 1 }
		}
	},
	{ versionKey: false }
);

module.exports = mongoose.model('SpecialEvents', specialEventSchema);
