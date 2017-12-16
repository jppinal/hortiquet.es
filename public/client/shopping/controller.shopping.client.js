angular.module('shopping')
.controller('ShoppingController', ['$scope', 'ShoppingFactory', function($scope, ShoppingFactory) {

  $scope.$on('shipping', function() {
    $scope.shipping = ShoppingFactory.shipping;
  });

}]);
