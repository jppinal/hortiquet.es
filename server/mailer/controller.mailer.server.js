var Order = require('mongoose').model('Order'),
    nodemailer = require('nodemailer'),
    ejs = require('ejs'),
    fs = require('fs'),
    math = require('mathjs'),
    configMailer = require('./config.mailer.json');

function sendMail(req, res, options, callback) {

  console.log(configMailer);

  var smtpTransport = nodemailer.createTransport(configMailer);

  smtpTransport.sendMail(options, function(error, info){
    if(error){
        console.log(error);
        res.status('404').end("error");
    }else{
        console.log("Message sent: " + info.response);
        callback(req, res);
    }
  });

};

function htmlMail(req, res, file, data, callback){

  fs.readFile(file, 'utf8', function(err, html){

      if(err){
        console.log(err);
        return res.render('error', { message: err, title: "Error reading file" });
      }

      var compiled = ejs.compile(html);
      html = compiled(data);

      callback(req, res, html)

    });
};

function autoReply(req, res, callback){

  var mailOptions = {};
  mailOptions.from = 'Hortiquet <info@hortiquet.es>';
  mailOptions.to = req.body.email;
  mailOptions.subject = 'Consulta recibida';

  var htmlData = {};
  htmlData.name = req.body.name;

  htmlMail(req, res, './server/views/mails/thankyou.ejs', htmlData, function(req, res, html){
    mailOptions.html = html;

    sendMail(req, res, mailOptions, function(req, res){
      callback(req, res);
    });

  });

};

exports.enquiry = function(req, res){

  var mailOptions = {};
  mailOptions.from = '"' + req.body.name + '" <' + req.body.email + '>';
  mailOptions.to = 'info@hortiquet.es';
  mailOptions.subject = '[WEB] ' + req.body.subject;
  mailOptions.text = req.body.message;

  traffic.register(req, res,'/mail/enquiry', mailOptions);

  sendMail(req, res, mailOptions, function(req, res){
    autoReply(req, res, function(req, res){
      res.redirect('/');
    });
  });

};

exports.order = function(req, res){

console.log(req.query.id);

Order.findOne({"orderId": req.query.id}, '', function (err, order) {

  if(err){
    console.log(err);
    return res.render('error', { message: err, title: "Order not found" });
  }

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

  var mailOptions = {};
  mailOptions.from = '"' + order.payment.name.first + " " + order.payment.name.last + '" <' + order.shipping.contact.email + '>';
  mailOptions.to = 'info@hortiquet.es';
  mailOptions.subject = '[ORDER] ' + req.query.id;

  traffic.register(req, res,'/mail/order', mailOptions);

  htmlMail(req, res, './server/views/mails/order.ejs', order, function(req, res, html){
    mailOptions.html = html;

    sendMail(req, res, mailOptions, function(req, res){

      mailOptions.from = 'Hortiquet <info@hortiquet.es>';
      mailOptions.to = order.shipping.contact.email;
      mailOptions.subject = 'Pedido recibido';

      sendMail(req, res, mailOptions, function(req, res){
        res.redirect('/order?id=' + order.orderId);
      });

    });

  });
 });

};


exports.orderTest = function(req, res){

  console.log('finding order ...');

  Order.findOne({"shipping.name.first": 'Juanito'}, '', function (err, order) {

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

    res.render('mails/order', order);
  });

};
