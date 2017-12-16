angular.module('home')
.controller('HomeController', ['$scope', 'Authentication', 'ShoppingFactory',  function($scope, Authentication, ShoppingFactory) {

		$scope.authentication = Authentication;

    $scope.cart = ShoppingFactory.cart;

    $scope.resizeHomeItems = function() {
      var slideHeight = $(window).height();
      $('#home-slider .item').css('height',slideHeight);
    };

}]);
