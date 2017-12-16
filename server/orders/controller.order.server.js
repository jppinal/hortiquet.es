var Order = require('mongoose').model('Order'),
    math = require('mathjs'),
    pdfbill = require('./pdf.bill.order.js'),
    pdfnote = require('./pdf.note.order.js');

var config = {};


exports.view = function(req, res) {

  traffic.register(req, res,'/order', req.query.id);

  Order.findOne({"orderId": req.query.id}, '', function (err, order) {

    var mathConfig = {notation: 'fixed', precision: 2};

    order.items.forEach( function(item){
      item.net = math.format(item.price - item.taxes, mathConfig);
      item.total = math.format(item.quantity * (item.price - item.taxes), mathConfig);
      item.price = math.format(item.price, mathConfig);
      item.taxes = math.format(item.taxes, mathConfig);
    });

    order.amount.subtotal = math.format(order.amount.subtotal, mathConfig);
    order.amount.taxes = math.format(order.amount.taxes, mathConfig);
    order.amount.shipping = math.format(order.amount.shipping, mathConfig);
    order.amount.total = math.format(order.amount.shipping + order.amount.subtotal + order.amount.taxes, mathConfig);

    res.render('order', order);
  });
};

exports.createBill = function(req, res) {

  var billing_address = {
    firstname: 'Juan',
    lastname: 'Sin Miedo',
    line1: 'calle Vilamarín',
    line2: '',
    city: 'Albacete',
    province: 'Albacete',
    postal_code: '02001',
    country: 'Espana'
  };

  var shipping_address = {
    firstname: 'Juan',
    lastname: 'Sin Miedo',
    line1: 'Calle Sin numero',
    city: 'En un lugar de a mancha',
    province: 'Albacete',
    postal_code: '02101',
    country: 'Espana'
  };

  var items = [
    {name: 'Hortiquet DUO'},
    {name: 'Hortiquet UNO'}
  ]

  var doc = pdfnote.create(billing_address, shipping_address, items);
  doc.pipe(res);
};
