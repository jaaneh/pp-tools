const mongoose = require('mongoose');

const achievementsSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		user_id: String,
		last_updated: Number,
		achievements: {
			terminator530: { type: Number, default: 0 },
			terminator530FtAmt: { type: Number, default: 0 },
			terminator530Bronze: { type: Boolean, default: false },
			terminator530Silver: { type: Boolean, default: false },
			terminator530Trophy: { type: Boolean, default: false },
			terminator530BronzeAmt: { type: Number, default: 1 },
			terminator530SilverAmt: { type: Number, default: 1 },
			terminator530TrophyAmt: { type: Number, default: 1 },
			deepstack215: { type: Number, default: 0 },
			deepstack215FtAmt: { type: Number, default: 0 },
			deepstack215Bronze: { type: Boolean, default: false },
			deepstack215Silver: { type: Boolean, default: false },
			deepstack215Trophy: { type: Boolean, default: false },
			deepstack215BronzeAmt: { type: Number, default: 1 },
			deepstack215SilverAmt: { type: Number, default: 1 },
			deepstack215TrophyAmt: { type: Number, default: 1 },
			gladiator320: { type: Number, default: 0 },
			gladiator320FtAmt: { type: Number, default: 0 },
			gladiator320Bronze: { type: Boolean, default: false },
			gladiator320Silver: { type: Boolean, default: false },
			gladiator320Trophy: { type: Boolean, default: false },
			gladiator320BronzeAmt: { type: Number, default: 1 },
			gladiator320SilverAmt: { type: Number, default: 1 },
			gladiator320TrophyAmt: { type: Number, default: 1 },
			mmbounty215: { type: Number, default: 0 },
			mmbounty215FtAmt: { type: Number, default: 0 },
			mmbounty215Bronze: { type: Boolean, default: false },
			mmbounty215Silver: { type: Boolean, default: false },
			mmbounty215Trophy: { type: Boolean, default: false },
			mmbounty215BronzeAmt: { type: Number, default: 1 },
			mmbounty215SilverAmt: { type: Number, default: 1 },
			mmbounty215TrophyAmt: { type: Number, default: 1 },
			clasico530: { type: Number, default: 0 },
			clasico530FtAmt: { type: Number, default: 0 },
			clasico530Bronze: { type: Boolean, default: false },
			clasico530Silver: { type: Boolean, default: false },
			clasico530Trophy: { type: Boolean, default: false },
			clasico530BronzeAmt: { type: Number, default: 1 },
			clasico530SilverAmt: { type: Number, default: 1 },
			clasico530TrophyAmt: { type: Number, default: 1 },
			warmup82: { type: Number, default: 0 },
			warmup82FtAmt: { type: Number, default: 0 },
			warmup82Bronze: { type: Boolean, default: false },
			warmup82Silver: { type: Boolean, default: false },
			warmup82Trophy: { type: Boolean, default: false },
			warmup82BronzeAmt: { type: Number, default: 1 },
			warmup82SilverAmt: { type: Number, default: 1 },
			warmup82TrophyAmt: { type: Number, default: 1 },
			dailygrind109: { type: Number, default: 0 },
			dailygrind109FtAmt: { type: Number, default: 0 },
			dailygrind109Bronze: { type: Boolean, default: false },
			dailygrind109Silver: { type: Boolean, default: false },
			dailygrind109Trophy: { type: Boolean, default: false },
			dailygrind109BronzeAmt: { type: Number, default: 1 },
			dailygrind109SilverAmt: { type: Number, default: 1 },
			dailygrind109TrophyAmt: { type: Number, default: 1 },
			terminator109: { type: Number, default: 0 },
			terminator109FtAmt: { type: Number, default: 0 },
			terminator109Bronze: { type: Boolean, default: false },
			terminator109Silver: { type: Boolean, default: false },
			terminator109Trophy: { type: Boolean, default: false },
			terminator109BronzeAmt: { type: Number, default: 1 },
			terminator109SilverAmt: { type: Number, default: 1 },
			terminator109TrophyAmt: { type: Number, default: 1 },
			deepstack55: { type: Number, default: 0 },
			deepstack55FtAmt: { type: Number, default: 0 },
			deepstack55Bronze: { type: Boolean, default: false },
			deepstack55Silver: { type: Boolean, default: false },
			deepstack55Trophy: { type: Boolean, default: false },
			deepstack55BronzeAmt: { type: Number, default: 1 },
			deepstack55SilverAmt: { type: Number, default: 1 },
			deepstack55TrophyAmt: { type: Number, default: 1 },
			gladiator55: { type: Number, default: 0 },
			gladiator55FtAmt: { type: Number, default: 0 },
			gladiator55Bronze: { type: Boolean, default: false },
			gladiator55Silver: { type: Boolean, default: false },
			gladiator55Trophy: { type: Boolean, default: false },
			gladiator55BronzeAmt: { type: Number, default: 1 },
			gladiator55SilverAmt: { type: Number, default: 1 },
			gladiator55TrophyAmt: { type: Number, default: 1 },
			mmbounty55: { type: Number, default: 0 },
			mmbounty55FtAmt: { type: Number, default: 0 },
			mmbounty55Bronze: { type: Boolean, default: false },
			mmbounty55Silver: { type: Boolean, default: false },
			mmbounty55Trophy: { type: Boolean, default: false },
			mmbounty55BronzeAmt: { type: Number, default: 1 },
			mmbounty55SilverAmt: { type: Number, default: 1 },
			mmbounty55TrophyAmt: { type: Number, default: 1 },
			clasico109: { type: Number, default: 0 },
			clasico109FtAmt: { type: Number, default: 0 },
			clasico109Bronze: { type: Boolean, default: false },
			clasico109Silver: { type: Boolean, default: false },
			clasico109Trophy: { type: Boolean, default: false },
			clasico109BronzeAmt: { type: Number, default: 1 },
			clasico109SilverAmt: { type: Number, default: 1 },
			clasico109TrophyAmt: { type: Number, default: 1 },
			warmup22: { type: Number, default: 0 },
			warmup22FtAmt: { type: Number, default: 0 },
			warmup22Bronze: { type: Boolean, default: false },
			warmup22Silver: { type: Boolean, default: false },
			warmup22Trophy: { type: Boolean, default: false },
			warmup22BronzeAmt: { type: Number, default: 1 },
			warmup22SilverAmt: { type: Number, default: 1 },
			warmup22TrophyAmt: { type: Number, default: 1 },
			dailygrind33: { type: Number, default: 0 },
			dailygrind33FtAmt: { type: Number, default: 0 },
			dailygrind33Bronze: { type: Boolean, default: false },
			dailygrind33Silver: { type: Boolean, default: false },
			dailygrind33Trophy: { type: Boolean, default: false },
			dailygrind33BronzeAmt: { type: Number, default: 1 },
			dailygrind33SilverAmt: { type: Number, default: 1 },
			dailygrind33TrophyAmt: { type: Number, default: 1 },
			terminator33: { type: Number, default: 0 },
			terminator33FtAmt: { type: Number, default: 0 },
			terminator33Bronze: { type: Boolean, default: false },
			terminator33Silver: { type: Boolean, default: false },
			terminator33Trophy: { type: Boolean, default: false },
			terminator33BronzeAmt: { type: Number, default: 1 },
			terminator33SilverAmt: { type: Number, default: 1 },
			terminator33TrophyAmt: { type: Number, default: 1 },
			deepstack11: { type: Number, default: 0 },
			deepstack11FtAmt: { type: Number, default: 0 },
			deepstack11Bronze: { type: Boolean, default: false },
			deepstack11Silver: { type: Boolean, default: false },
			deepstack11Trophy: { type: Boolean, default: false },
			deepstack11BronzeAmt: { type: Number, default: 1 },
			deepstack11SilverAmt: { type: Number, default: 1 },
			deepstack11TrophyAmt: { type: Number, default: 1 },
			gladiator11: { type: Number, default: 0 },
			gladiator11FtAmt: { type: Number, default: 0 },
			gladiator11Bronze: { type: Boolean, default: false },
			gladiator11Silver: { type: Boolean, default: false },
			gladiator11Trophy: { type: Boolean, default: false },
			gladiator11BronzeAmt: { type: Number, default: 1 },
			gladiator11SilverAmt: { type: Number, default: 1 },
			gladiator11TrophyAmt: { type: Number, default: 1 },
			mmbounty11: { type: Number, default: 0 },
			mmbounty11FtAmt: { type: Number, default: 0 },
			mmbounty11Bronze: { type: Boolean, default: false },
			mmbounty11Silver: { type: Boolean, default: false },
			mmbounty11Trophy: { type: Boolean, default: false },
			mmbounty11BronzeAmt: { type: Number, default: 1 },
			mmbounty11SilverAmt: { type: Number, default: 1 },
			mmbounty11TrophyAmt: { type: Number, default: 1 },
			clasico33: { type: Number, default: 0 },
			clasico33FtAmt: { type: Number, default: 0 },
			clasico33Bronze: { type: Boolean, default: false },
			clasico33Silver: { type: Boolean, default: false },
			clasico33Trophy: { type: Boolean, default: false },
			clasico33BronzeAmt: { type: Number, default: 1 },
			clasico33SilverAmt: { type: Number, default: 1 },
			clasico33TrophyAmt: { type: Number, default: 1 }
		}
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Achievements', achievementsSchema);
