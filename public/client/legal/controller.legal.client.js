angular.module('legal')
.controller('LegalsController', ['$scope', 'Authentication', function($scope, Authentication) {

		$scope.authentication = Authentication;

    $scope.website = "www.hortiquet.es";
    $scope.webAbrv = "SITIO WEB";
    $scope.legalResponsible = "Nombre Apellidos con DNI-123456789E";
    $scope.legalAbrv = "UMVELTA";

}]);
