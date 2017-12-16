var mongoose = require('mongoose'),
	  crypto = require('crypto'),
	  Schema = mongoose.Schema;

var OrderSchema = new Schema({
    orderId: {type: String, trim: true,	unique: true},
    state: String,
  	trace: [],
    amount: {
      subtotal: Number,
      taxes: Number,
      shipping: Number
    },
    items: {},
    payment: {
      name: {
        first: String,
        last: String
      },
      address: {
        line1: String,
        line2: String,
        city: String,
        postalCode: String,
        province: String,
        country: String
      },
      contact: {},
      method: String,
      paypal: {},
      data: {},
      trace: []
    },
    shipping: {
      name: {
        first: String,
        last: String
      },
      address: {
        line1: String,
        line2: String,
        city: String,
        postalCode: String,
        province: String,
        country: String
      },
      fare : {
        sku: String,
        price: Number,
        taxes: Number
      },
      contact: {},
      method: String,
      data: {},
      trace: []
    }
  });

/*OrderSchema.pre('save',
  function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	}
);*/

/*
OrderSchema.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};
*/

mongoose.model('Order', OrderSchema);
