angular.module('shopping')
.factory('ShoppingStepsFactory', ['$rootScope', function($rootScope) {
  var ShoppingStepsObject = {}
  ShoppingStepsObject.panes = [];
  ShoppingStepsObject.selected = {};

  ShoppingStepsObject.select = function(pane) {
    angular.forEach(ShoppingStepsObject.panes, function(pane) {
      pane.selected = false;
    });
    pane.selected = true;
    ShoppingStepsObject.selected = pane;
    $rootScope.$broadcast('shopping-steps-select');
  };

  ShoppingStepsObject.addPane = function(pane) {
    if (ShoppingStepsObject.panes.length === 0) {
      ShoppingStepsObject.select(pane);
    } else {
      pane.previous = ShoppingStepsObject.panes[ShoppingStepsObject.panes.length - 1];
      ShoppingStepsObject.panes[ShoppingStepsObject.panes.length - 1].next = pane;
    }
    ShoppingStepsObject.panes.push(pane);
    $rootScope.$broadcast('shopping-steps-add');
  };

  ShoppingStepsObject.nextPane = function(pane) {
    ShoppingStepsObject.select(ShoppingStepsObject.selected.next);
  };

  ShoppingStepsObject.prevPane = function(pane) {
    ShoppingStepsObject.select(ShoppingStepsObject.selected.previous);
  };

  return ShoppingStepsObject;
}])
.controller('ShoppingStepsController', ['$scope', 'ShoppingStepsFactory', function($scope, ShoppingStepsFactory) {
  $scope.panes = ShoppingStepsFactory.panes = [];

  $scope.select = function(pane) {
    //angular.forEach(panes, function(pane) {
    //  pane.selected = false;
    //});
    ShoppingStepsFactory.select(pane);
    //$scope.steps = pane.percentage;
    //pane.selected = true;
  };

  this.addPane = function(pane) {
    /*if (panes.length === 0) {
      $scope.select(pane);
    }
    panes.push(pane);*/
    ShoppingStepsFactory.addPane(pane);
  };

  $scope.$on('shopping-steps-select', function() {
      $scope.steps = ShoppingStepsFactory.selected.percentage;
  });

}])
.directive('shoppingSteps', function() {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: '/client/shopping/steps/template.steps.shopping.html',
      transclude: false,
      controller: 'ShoppingStepsController'
    };
})
.directive('shoppingStep', function() {
  return {
    require: '^^shoppingSteps',
    restrict: 'C',
    transclude: true,
    scope: {
      name: '=',
      percentage: '=',
      icon: "="
    },
    link: function(scope, element, attrs, shoppingStepsCtrl) {
      shoppingStepsCtrl.addPane(scope);
    },
    template: '<div ng-transclude ng-show="selected"></div>'
  };
});
