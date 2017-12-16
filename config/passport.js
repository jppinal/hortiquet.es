var passport = require('passport'),
	  mongoose = require('mongoose');

module.exports = function() {
	var User = mongoose.model('User');

  var admin = new User({
    name: 'administrator',
    email: 'info@hortiquet.es',
    password: '',
    username: 'admin',
    provider: 'local'
  });
  admin.save();

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne(
			{_id: id},
			'-password',
			function(err, user) {
				done(err, user);
			}
		);
	});

	require('./strategies/local.js')();
	//require('./strategies/facebook.js')();
	//require('./strategies/twitter.js')();
};
