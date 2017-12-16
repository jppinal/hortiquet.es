var traffic = require('../traffic/service.traffic.server.js');

exports.render = function(req, res) {

    traffic.register(req, res, '/legal');

    res.render('legal', {
    	title: 'Hortiquet',
    	user: JSON.stringify(req.user)
    });

};
