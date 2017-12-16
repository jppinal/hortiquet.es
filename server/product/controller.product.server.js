var fs = require('fs');
var seeds = require('./products.seeds.json');
var traffic = require('../traffic/service.traffic.server.js');

exports.render = function(req, res) {

  traffic.register(req, res,'/product?hortiquet=' + req.query.hortiquet);

  var datafile = '';
  if(req.query.hortiquet === 'AROMA')     datafile = './server/product/products.aroma.json';
  if(req.query.hortiquet === 'DUO')       datafile = './server/product/products.duo.json';
  if(req.query.hortiquet === 'ENSALADA')  datafile = './server/product/products.ensalada.json';
  if(req.query.hortiquet === 'UNO')       datafile = './server/product/products.uno.json';

  if(datafile === '') return res.render('error', {message: 'Specified product not found', title: 'product not found'});

  fs.readFile(datafile, 'utf8', function(err, data) {
    if (err) throw err;

    var productData = JSON.parse(data);
    productData.seeds = seeds;

    productData.productSKUs.forEach( function(sku) {
      sku.seedsInfo = [];
      seeds.filter( function(seed) {
        return sku.seeds.some( function(s){ return s === seed.name});
      })
      .forEach( function(seed) {
        sku.seedsInfo.push(seed);
      });
    });

    //user: JSON.stringify(req.user)
    res.render('product', productData);

  });

};
