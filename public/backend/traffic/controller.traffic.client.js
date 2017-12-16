angular.module('traffic')
.controller('TrafficController', ['$scope', function($scope) {

  var mapConfig = {
    center: new google.maps.LatLng(40.392770,-3.659691),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.$on('geoip', function(event, data)  {
    var position = new google.maps.LatLng(data.lat, data.lon);
    var marker=new google.maps.Marker({
      position: position,
      title: data.query,
    });
    marker.setMap($scope.map);
  });

  google.maps.event.addDomListener(window, 'load', function(){
    $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapConfig);
  });

}]);
