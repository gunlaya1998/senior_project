const mongoose = require("mongoose");
var Int32 = require('mongoose-int32');
const Double = require('@mongoosejs/double');
const Schema = mongoose.Schema;

let ranking_places = new Schema({
    placeRank: {type:Int32},
	placeName: {type: String},
	lat: {type: String},
	lon: {type: String},
	photoRef: {type: String},
	provinceTh: {type: String},
	placeScore: {type: Double}
},
    { collection : 'Ranking_Places' });

module.exports = mongoose.model("Ranking_Places", ranking_places);