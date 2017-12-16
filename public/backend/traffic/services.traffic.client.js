angular.module('traffic')
.factory('GeoIPFactory', ['$rootScope','$http', function($rootScope, $http) {
  var factoryObject = {}

  factoryObject.lookup = function(ip, geo) {
      var config = {};
      $http.get('http://ip-api.com/json/' + ip, config).then( function(response) {
        $rootScope.$broadcast('geoip', response.data);
      });
  };

  return factoryObject;
}]);
