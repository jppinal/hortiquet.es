var passport = require('passport')

module.exports = function(app) {

    var home = require('./home/controller.home.server');
    app.get('/', home.render);

    var launch = require('./launch/controller.launch.server');
    app.get('/launch', launch.render);

    var legal = require('./legal/controller.legal.server');
    app.get('/legal', legal.render);

    var mailer = require('./mailer/controller.mailer.server');
    app.get('/mail/order', mailer.order);
    app.post('/mail/enquiry', mailer.enquiry);
    app.get('/mail/order-test', mailer.orderTest);

    var order = require('./orders/controller.order.server');
    app.get('/order', order.view);

    var paypalOrder = require('./orders/paypal.order.server');
    app.post('/paypal-create', paypalOrder.create);
    app.get('/paypal-execute', paypalOrder.execute);

    var product = require('./product/controller.product.server');
    app.get('/product', product.render);

    var shopping = require('./shopping/controller.shopping.server');
    app.get('/shopping', shopping.render);

    var image = require('./image/controller.image.server');
    app.get('/image', image.render);

    var shipping = require('./shipping/controller.shipping.server');
    app.get('/shipping-fare', shipping.fare);
    app.post('/shipping-fare', shipping.fare);

    var login = require('./login/service.login.server');
    app.get('/backend', login.render);
    app.post('/backend/login', passport.authenticate('local', {
			                     successRedirect: '/backend/traffic',
			                     failureRedirect: '/backend',
			                     failureFlash: true
		                    }));
    app.post('/backend/logout', login.logout);

    var traffic = require('./traffic/service.traffic.server');
    app.get('/backend/traffic', login.required, traffic.render);

    app.get('/google7a8cc3c947f0f589.html', function(req, res){
      res.render('google/google7a8cc3c947f0f589');
    })


    app.get('/error',
      function(req, res) {

        res.render('error', {
          title: "Test error",
          message: "Test error message"
        });

      }
    );

};
