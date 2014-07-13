'use strict';
window.app.controller('HomeCtrl', function ($rootScope, $scope, $routeParams, $location, $translate) {
	var locations = ['en', 'pt'],
	lang = ($routeParams.lang || window.navigator.language.substr(0,2));

	if($.inArray(lang, locations) == -1 ) {
		lang = $translate.preferredLanguage();
	}

	$translate.use(lang);
})