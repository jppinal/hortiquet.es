var config = require('./config'),
	  express = require('express'),
	  bodyParser = require('body-parser'),
	  passport = require('passport'),
	  flash = require('connect-flash'),
	  session = require('express-session'),
    nodemailer = require('nodemailer');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'XXX'
	}));

	app.set('views', './server/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	require('../server/routes.server.js')(app);
	app.use(express.static('./public'));

	return app;
};
