var appName = 'hortiquet';
var app = angular.module(appName, ['ngResource', 'ngRoute', 'angular-cookie-law', 'common', 'users', 'shopping', 'home', 'product', 'order', 'legal']);

app.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
	angular.bootstrap(document, [appName]);
});
