angular.module('product')
.controller('ProductsController', ['$scope', '$location', '$anchorScroll', 'Authentication', 'ShoppingFactory',  function($scope, $location, $anchorScroll, Authentication, ShoppingFactory) {

		$scope.authentication = Authentication;
    $scope.cart = ShoppingFactory.cart;

    var $leftControls = $('.left-control');
    if($leftControls.length < 3){
      $leftControls.addClass('hidden');
    }

    var $rightControls = $('.right-control');
    if($rightControls.length < 3){
      $rightControls.addClass('hidden');
    }

    $scope.addtoCart = function(itemData){
      $scope.cart.addItem(itemData);

      $location.hash('top');
      $anchorScroll();

      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $('#md-cart').addClass('animated tada').one(animationEnd, function() {
            $('#md-cart').removeClass('animated tada');
        });

      $('#sm-cart').addClass('animated tada').one(animationEnd, function() {
            $('#sm-cart').removeClass('animated tada');
        });
    }


}]);
