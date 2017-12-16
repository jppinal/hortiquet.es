angular.module('shopping')
.controller('ConfirmStepController', ['$scope', '$http', '$location', '$window', 'ShoppingFactory', 'ShoppingStepsFactory', function($scope, $http, $location, $window, ShoppingFactory, ShoppingStepsFactory) {

  $scope.cart = ShoppingFactory.cart;

  $scope.next = function() {
    ShoppingStepsFactory.nextPane();
  }
  $scope.previous = function() {
    ShoppingStepsFactory.prevPane();
  }

  $scope.$on('shipping', function() {
    $scope.shipping = ShoppingFactory.shipping;
    console.log($scope.shipping);
  });

  $scope.buyItems = function() {
    shoppingData = {};
    shoppingData.cart = {};
    shoppingData.cart.name = ShoppingFactory.cart.cartName;
    shoppingData.cart.items = ShoppingFactory.cart.items;
    shoppingData.shipping = ShoppingFactory.shipping;

    console.log("posting data....");

    $http.post('/paypal-create', (shoppingData)).then(
      function(response){
        console.log(response);
        $window.location.href = response.data.href;
      },
      function(data){ console.log(data); }
    );
  };

}])
.directive('confirmStep', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
    },
    templateUrl: '/client/shopping/confirm/template.confirm.step.html',
    controller: 'ConfirmStepController'
  };
});
