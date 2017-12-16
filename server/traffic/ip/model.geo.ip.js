var mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

var GeoIPSchema = new Schema({
    region:  String,
    country: String,
  	range: []
  });

mongoose.model('GeoIP', GeoIPSchema);
