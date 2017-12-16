angular.module('shopping')
.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {
      redirectTo: '/'
		});
	}
]);
