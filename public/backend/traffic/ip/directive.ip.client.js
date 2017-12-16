angular.module('traffic')
.factory('PrivateIP', function($http) {
  var promise = null;

  return function() {
    if (promise) {
      // If we've already asked for this data once,
      // return the promise that already exists.
      return promise;
    } else {
      promise = $http.get('/backend/traffic/ip/private.ip.json');
      return promise;
    }
  };
})
.controller('IPController', ['$scope', 'GeoIPFactory' , function($scope, GeoIPFactory) {

  $scope.geo = {};
  GeoIPFactory.lookup($scope.address, $scope.geo);

  $scope.$on('geoip', function(event, data)  {
    if(data.query === $scope.address) $scope.geo = data;
  });
}])
.directive('ip', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      address: '='
    },
    templateUrl: '/backend/traffic/ip/template.ip.html',
    controller: 'IPController'
  };
});
