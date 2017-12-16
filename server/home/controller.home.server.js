var uno = require('../product/products.uno.json');
var duo = require('../product/products.duo.json');
var ensalada = require('../product/products.ensalada.json');
var aroma = require('../product/products.aroma.json');
var traffic = require('../traffic/service.traffic.server.js');

exports.render = function(req, res) {

    var homeData = {};
    homeData.title = 'Hortiquet';
    homeData.user = JSON.stringify(req.user);
    homeData.products = [];

    homeData.products.push(uno);
    homeData.products.push(duo);
    homeData.products.push(aroma);
    homeData.products.push(ensalada);

    traffic.register(req, res,'/');

    res.render('home', homeData);

};
