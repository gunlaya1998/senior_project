const mongoose = require("mongoose");
var Int32 = require('mongoose-int32');
const Double = require('@mongoosejs/double');
const Schema = mongoose.Schema;

let thread_data = new Schema({
  threadId: {type: Int32},
  threadTitle: {type: String},
  placeList: {type: Array},
  // placeName: {type: Array},
  provinceTh: {type: Array},
  // provinceId: {type: Array},
  threadScore: {type: Double},
  coor: {type: Array}
}
  , { collection : 'Thread_Data' }
  , { strict: false });

module.exports = mongoose.model("Thread_Data", thread_data);