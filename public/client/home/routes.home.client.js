angular.module('home')
.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '/client/home/view.home.client.html',
      controller: 'HomeController'
		}).
    when('/legal-notice', {
      redirectTo: '/legal/notice'
    }).
    when('/privacy-policy', {
      redirectTo: '/legal/privacy'
    }).
    when('/privacy-cookies', {
      redirectTo: '/legal/cookies'
    });
	}
]);
