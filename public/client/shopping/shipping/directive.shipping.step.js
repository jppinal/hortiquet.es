angular.module('shopping')
.factory('ProvincesFactory', ['$http', function($http) {
  var promise = null;

  return function() {
    if (promise) {
      // If we've already asked for this data once,
      // return the promise that already exists.
      return promise;
    } else {
      promise = $http.get('/client/data/shipping.provinces.json');
      return promise;
    }
  };
}])
.factory('ShippingCostsFactory', ['$http', function($http) {
  var promise = null;

  return function() {
    if (promise) {
      // If we've already asked for this data once,
      // return the promise that already exists.
      return promise;
    } else {
      //promise = $http.get('/client/data/shipping.costs.json');
      return promise;
    }
  };
}])
.controller('ShippingStepController', ['$scope', 'ShoppingFactory', 'ProvincesFactory', 'ShoppingStepsFactory', '$http',
  function($scope, ShoppingFactory, ProvincesFactory, ShoppingStepsFactory, $http) {

  $scope.shipping = {};
  $scope.shipping.name = {};
  $scope.shipping.address = {};
  $scope.shipping.contact = {};
  $scope.shipping.fare = {};

  $scope.cart = ShoppingFactory.cart;

  ProvincesFactory().success(function(data) {
        $scope.regions = data.regions;
      });

  $scope.next = function() {
    $scope.shipping.fare.sku = "";
    //$('#shipping-form').submit();
    $scope.shippingCost( function() {
      ShoppingFactory.updateShipping($scope.shipping);
      ShoppingStepsFactory.nextPane();
    });
  }

  $scope.previous = function() {
    ShoppingFactory.updateShipping($scope.shipping);
    ShoppingStepsFactory.prevPane();
  }

  $scope.selectProvince = function() {
    var postalprefix = undefined;
    if($scope.shipping.address.postalCode) postalprefix = $scope.shipping.address.postalCode.slice(0,2);

    var region = $scope.regions.find(function (region) {
                    return region.provinces.some(function (p) {
                      return p.postalcode === postalprefix;
                    })
                  });

    if (region) {
      $scope.shipping.address.province = region.provinces.find(function (province) {
                                            return province.postalcode === postalprefix;
                                          }).name;
    }else{
      $scope.shipping.address.province = "";
    }
  }

  $scope.shippingCost = function(callback) {
    var postalprefix = $scope.shipping.address.postalCode.slice(0,2);
    $scope.shipping.fare = {};
    $scope.shipping.fare.provider = 'Envialia';
    $scope.shipping.fare.mode = 'Domicilio';

    var postData = {};
    postData.provider = $scope.shipping.fare.provider;
    postData.mode= $scope.shipping.fare.mode;
    postData.postalprefix = postalprefix;
    console.log(postData);

    $http.post('/shipping-fare', postData).then(
      function(response) {
        console.log(response);
        $scope.shipping.fare.sku = response.data.sku;
        $scope.shipping.fare.price = response.data.price;
        $scope.shipping.fare.taxes = response.data.taxes;
        $scope.shipping.fare.total = response.data.price * $scope.cart.getTotalCount();
        $scope.shipping.fare.totaltaxes = response.data.taxes * $scope.cart.getTotalCount();
        callback();
      },
      function(err) {
        console.log(err);
      });

  }

}])
.directive('shippingStep', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
    },
    templateUrl: '/client/shopping/shipping/template.shipping.step.html',
    controller: 'ShippingStepController'
  };
});
