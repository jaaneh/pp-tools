const mongoose = require('mongoose');

const knockoutsSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		user_id: String,
		last_updated: Number,
		knockouts: {
			mattstaples: { type: Number, default: 0 },
			jeffgross: { type: Number, default: 0 },
			kristenbicknell: { type: Number, default: 0 },
			allinpav: { type: Number, default: 0 },
			kevinmartin: { type: Number, default: 0 },
			luimartins: { type: Number, default: 0 },
			anatolyfilatov: { type: Number, default: 0 },
			hotted: { type: Number, default: 0 },
			ryanschoonbaert: { type: Number, default: 0 },
			egption: { type: Number, default: 0 },
			dramaticdegen: { type: Number, default: 0 },
			courtiebee: { type: Number, default: 0 },
			elky: { type: Number, default: 0 },
			patrickleonard: { type: Number, default: 0 },
			heymonia: { type: Number, default: 0 },
			dwstevie: { type: Number, default: 0 },
			tonkaaaap: { type: Number, default: 0 },
			isildur: { type: Number, default: 0 },
			bencb: { type: Number, default: 0 }
		}
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Knockouts', knockoutsSchema);
