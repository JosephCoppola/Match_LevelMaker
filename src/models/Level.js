var mongoose = require('mongoose');
var _ = require('underscore');

var LevelModel;

var setName = function(name)
{
	return _.escape(name).trim();
};

var LevelSchema = new mongoose.Schema({

	levelArray:{
		type: String,
		required: true,
		unique: true	
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createdData: {
		type: Date,
		default: Date.now
	}
});

LevelSchema.methods.toAPI = function() {
	return {
		levelArray: this.levelArray
	};
};

LevelSchema.statics.findByOwner = function(ownerId,callback){
	
	var search  = {
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return LevelModel.find(search).select("levelArray").exec(callback);
};

LevelModel = mongoose.model('Domo',LevelSchema);

module.exports.LevelModel = LevelModel;
module.exports.LevelSchema = LevelSchema;