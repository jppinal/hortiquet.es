var Order = require('mongoose').model('Order'),
	  passport = require('passport'),
    uuid = require('node-uuid'),
    paypalPayment = require('./paypal/payment.paypal.server.js'),
    traffic = require('../traffic/service.traffic.server.js');

var config = {};

exports.create = function(req, res) {

  paypalPayment.init();

  var newOrder = new Order();
  newOrder.orderId = uuid.v4();

  traffic.register(req, res,'/paypal-create', newOrder.orderId);

  newOrder.items = req.body.cart.items;
  newOrder.shipping = req.body.shipping;

  paypalPayment.create(req, res, newOrder.orderId, function(resp) {

    newOrder.state = 'created';
    newOrder.payment.paypal = {};
    newOrder.payment.paypal.id = resp.id;

    newOrder.amount.shipping = Number(resp.transactions[0].amount.details.shipping);
    newOrder.amount.subtotal = Number(resp.transactions[0].amount.details.subtotal);;
    newOrder.amount.taxes = Number(resp.transactions[0].amount.details.tax);;

    console.log('[!] newOrder');

    newOrder.save( function(err) {

        if (err) {
          console.log(err);
          return res.render('error', {"title": "Mongoose error", "message": err});
        }

        console.log('[!] Saved');
        var links = resp.links;
        var i;
        for (i in links) {
          if (links[i].rel === 'approval_url') {
            return res.json(links[i]);
          }
        }

    });
  });

};

exports.execute = function (req, res) {

    traffic.register(req, res,'/paypal-execute', req.query.order_id);

    console.log('[!] Order execute');

    Order.findOne({"orderId": req.query.order_id}, '', function (err, order) {

      if (err) {
        console.log("[!] err: ");
        console.log(err);
        return res.render('error', {"title": "Error", "message": err});
      }

      if (!order) {
        console.log("[!] err: ");
        console.log(err);
        return res.render('error', {"title": "Order not found", "message": req.query.order_id});
      }

      paypalPayment.execute(req, res, order.payment.paypal.id, function (resp) {

        order.payment.method = resp.payer.payment_method;

        console.log('[!] resp.payer.payer_info');

        var billing_address = resp.payer.payer_info.billing_address;
        order.payment.name = {};
        order.payment.name.first = resp.payer.payer_info.first_name;
        order.payment.name.last = resp.payer.payer_info.last_name;
        order.payment.address.line1 = billing_address.line1;
        order.payment.address.line2 = billing_address.line2;
        order.payment.address.city = billing_address.city;
        order.payment.address.postalCode = billing_address.postal_code;
        order.payment.address.province = billing_address.state;
        order.payment.address.country = billing_address.country_code;
        order.payment.contact = {};
        order.payment.contact.phone = resp.payer.payer_info.phone;
        order.payment.contact.email = resp.payer.payer_info.email;

        order.payment.paypal.payer_id = resp.payer.payer_info.payer_id;
        order.payment.paypal.transactions = resp.transactions;

        order.trace.push({"state": resp.state, "time" :resp.create_time});

        console.log('[!] order');

        order.save(function(err) {
            if (err) {
              console.log("[!] err:");
              console.log(err);
              return res.render('error', { message: err, title: "Order updating error" });
            }
            console.log("[!] res.render order");
            res.redirect('/mail/order?id=' + order.orderId);
          });
      });
    });
};
