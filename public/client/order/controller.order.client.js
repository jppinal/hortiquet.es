angular.module('order')
.controller('OrderController', [ '$scope', 'ShoppingFactory', function($scope, ShoppingFactory) {

  $scope.cart = ShoppingFactory.cart;
  $scope.cart.clearItems();

}]);
