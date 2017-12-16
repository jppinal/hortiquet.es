angular.module('legal')
.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/notice', {
			templateUrl: '/client/legal/views/view.notice.legal.html',
      controller: 'LegalsController'
		}).
    when('/privacy-policy', {
      templateUrl: '/client/legal/views/view.policy.legal.html',
      controller: 'LegalsController'
    }).
    when('/privacy-cookies', {
      templateUrl: '/client/legal/views/view.cookies.legal.html',
      controller: 'LegalsController'
    })
	}
]);
