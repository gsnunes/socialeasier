'use strict';
window.app.controller('HomeCtrl', function ($rootScope, $scope, $routeParams, $location, $translate) {
	var lang = $routeParams.lang || window.navigator.language.substr(0,2);
	$translate.use(lang);
})