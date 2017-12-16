var mongoose = require('mongoose'),
	  crypto = require('crypto'),
	  Schema = mongoose.Schema;

var TrafficSchema = new Schema({
    ip: String,
  	date: { type: Date, default: Date.now },
    page: String,
    data: {}
  });

mongoose.model('Traffic', TrafficSchema);
