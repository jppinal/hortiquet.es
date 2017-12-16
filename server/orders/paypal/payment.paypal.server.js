var paypal = require('paypal-rest-sdk'),
    math = require('mathjs'),
    paypalPaymentDefault = require('./payment.paypal.json'),
    config = require('../../../config/config');

exports.init = function(mode) {
  paypal.configure(config.paypal);
};

exports.create = function(req, res, orderId, callback) {

  var paypalPayment = paypalPaymentDefault;

  var cartItems = req.body.cart.items;
  var shippingData = req.body.shipping;

  var mathConfig = {notation: 'fixed', precision: 2};

  paypalPayment.transactions[0].amount.currency = "EUR";
  paypalPayment.transactions[0].description = "Descripcion de prueba";//req.session.desc;
  paypalPayment.transactions[0].amount.details.tax = 0.00;
  paypalPayment.transactions[0].amount.details.shipping = (math.format(shippingData.fare.total, mathConfig));
  paypalPayment.transactions[0].amount.details.subtotal = 0.00;
  paypalPayment.transactions[0].amount.total = shippingData.fare.total;

  paypalPayment.transactions[0].item_list.items = [];
  cartItems.forEach(function (item) {
    var newItem = {};
    newItem.quantity = item.quantity;
    newItem.price = (math.format(item.price - item.taxes, mathConfig));
    newItem.name = item.name;
    newItem.currency = "EUR";
    newItem.sku = item.sku;
    newItem.tax = (math.format(item.taxes, mathConfig));
    newItem.description = item.skushortname;

    paypalPayment.transactions[0].item_list.items.push(newItem);
    paypalPayment.transactions[0].amount.total += item.price * item.quantity;
    paypalPayment.transactions[0].amount.details.subtotal += newItem.price * item.quantity;
    paypalPayment.transactions[0].amount.details.tax += item.taxes * item.quantity;
  });

  paypalPayment.transactions[0].amount.total = (math.format(paypalPayment.transactions[0].amount.total, mathConfig));
  paypalPayment.transactions[0].amount.details.subtotal = (math.format(paypalPayment.transactions[0].amount.details.subtotal, mathConfig));
  paypalPayment.transactions[0].amount.details.tax = (math.format(paypalPayment.transactions[0].amount.details.tax, mathConfig));

  paypalPayment.transactions[0].item_list.shipping_address.recipient_name = shippingData.name.first + ' ' + shippingData.name.last;
  paypalPayment.transactions[0].item_list.shipping_address.type = "residential";
  paypalPayment.transactions[0].item_list.shipping_address.line1 = shippingData.address.line1;
  paypalPayment.transactions[0].item_list.shipping_address.line2 = shippingData.address.line2;
  paypalPayment.transactions[0].item_list.shipping_address.city = shippingData.address.city;
  paypalPayment.transactions[0].item_list.shipping_address.country_code = "ES";
  paypalPayment.transactions[0].item_list.shipping_address.postal_code = shippingData.address.postalCode;
  paypalPayment.transactions[0].item_list.shipping_address.phone = shippingData.contact.phone;

  paypalPayment.redirect_urls.return_url = config.return_url + "/paypal-execute?order_id=" + orderId;
  paypalPayment.redirect_urls.cancel_url = config.return_url + "/shopping";

  paypal.payment.create(paypalPayment, {}, function (err, resp) {

      if (err) {
        console.log("[!] err: ");
        console.log(err);
        return res.render('error', {"title": "Paypal server returns error", "message": err});
      }

      if (!resp) {
        console.log("[!] !resp: ");
        console.log(resp);
        return res.render('error', {"title": "Paypal server communication error", "message": "No response recieved from Paypal server"});
      }

      console.log("[!] resp: ");
      console.log(resp);

      callback(resp);

    });
};

exports.execute = function(req, res, paymentId, callback) {

  console.log('[!] Paypal Execute');

  paypal.payment.execute(paymentId, { payer_id : req.query.PayerID }, {}, function (err, resp) {

    if (err) {
      console.log("[!] err: ");
      console.log(err);
      return res.render('error', {"title": "Paypal server returns error", "message": err});
    }

    if (!resp) {
      console.log("[!] !resp: ");
      console.log(resp);
      return res.render('error', {"title": "Paypal server communication error", "message": "No response recieved from Paypal server"});
    }

    callback(resp);

  });
};
