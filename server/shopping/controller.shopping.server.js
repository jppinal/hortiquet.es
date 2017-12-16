var traffic = require('../traffic/service.traffic.server.js');

exports.render = function(req, res) {

    traffic.register(req, res, '/shopping');

    var shoppingData = {};
    shoppingData.title = 'Hortiquet';
    shoppingData.user = JSON.stringify(req.user);

    res.render('shopping', shoppingData);

};
