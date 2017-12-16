var passport = require('passport');

exports.render = function(req, res) {
  if (!req.user) {
		res.render('backend/login', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/backend/traffic');
	}
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.required = function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/backend');
	}
	next();
};
