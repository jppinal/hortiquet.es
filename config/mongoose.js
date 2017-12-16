var config = require('./config'),
	  mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);

	require('../server/login/users/model.user.server.js');
  require('../server/orders/model.order.server.js');
  require('../server/traffic/model.traffic.server.js');

	return db;
};
