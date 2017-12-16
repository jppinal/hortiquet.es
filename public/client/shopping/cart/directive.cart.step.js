angular.module('shopping')
.controller('CartStepController', ['$scope', 'ShoppingFactory', 'ShoppingStepsFactory', function($scope, ShoppingFactory, ShoppingStepsFactory) {

  $scope.skuInfo = {};
  $scope.cart = ShoppingFactory.cart;

  $scope.next = function() {
    ShoppingStepsFactory.nextPane();
  };

}])
.directive('cartStep', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
    },
    templateUrl: '/client/shopping/cart/template.cart.step.html',
    controller: 'CartStepController'
  };
});
