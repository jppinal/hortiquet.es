var providers = require('./shipping.costs.json');


exports.fare = function(req, res) {

  var req_provider = req.body.provider;
  var req_mode = req.body.mode;
  var req_postalprefix = req.body.postalprefix;

  var req_fare = {};
  var found = false;

  var provider;
  for(p in providers) {
    if (providers[p].name !== req_provider) continue;

    var c;
    var shippingcosts = providers[p].shippingcosts;
    for(c in shippingcosts) {
      if (shippingcosts[c].mode !== req_mode) continue;

        var f;
        var fares = shippingcosts[c].fares;
        for(f in fares) {
          if (req_fare[c]) break;

          var i;
          for(i in fares[f].postalcodes){
            if(fares[f].postalcodes[i] !== req_postalprefix) continue;
            req_fare.sku = fares[f].sku;
            req_fare.price = fares[f].price;
            req_fare.taxes = fares[f].taxes;
            break;
            }
        }
        break;
      }
    break;
  }

  return res.json(req_fare);

};
