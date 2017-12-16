#!/bin/env node
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport'),
    nodemailer = require('./config/nodemailer');

var db = mongoose(),
    app = express(),
    passport = passport(),
    smtpTransport = nodemailer();

app.listen(config.port, config.ipaddress);

module.exports = app;
console.log('%s: Node %s server started on %s:%d ...',
            Date(Date.now() ),
            process.env.NODE_ENV,
            config.ipaddress,
            config.port);
