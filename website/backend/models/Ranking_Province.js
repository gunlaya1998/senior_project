const mongoose = require("mongoose");
var Int32 = require('mongoose-int32');
const Double = require('@mongoosejs/double');
const Schema = mongoose.Schema;

let ranking_province = new Schema({
  provinceId: {type: Int32},
  provinceRank: {type: Int32},
  provinceTh: {type: String},
  provinceEn: {type: String},
  provinceLat: {type: String},
  provinceLon: {type: String},
  photoRef: {type: String},
  provinceScore: {type: Double},
  provinceDesc: {type: String},
},
  { collection : 'Ranking_Province' });

module.exports = mongoose.model("Ranking_Province", ranking_province);