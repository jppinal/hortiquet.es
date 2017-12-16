angular.module('shopping')
.factory('ShoppingFactory', ['$rootScope', function($rootScope) {
  var ShoppingObject = {}
  ShoppingObject.cart = new shoppingCart("hortiquetOnlineStore");
  ShoppingObject.shipping = {};

  ShoppingObject.updateShipping = function(data) {
      this.shipping = data;
      $rootScope.$broadcast('shipping');
  };

  return ShoppingObject;
}]);
