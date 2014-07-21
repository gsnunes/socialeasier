'use strict';
window.app.controller('ChatCtrl', function ($rootScope, $scope, $routeParams, $location, $translate) {

	$scope.$on('$viewContentLoaded', function() {
		var topH = $('.header').height(),
		bottomH = $('.bottom-chat').height(),
		windowH = $(window).height();

		$('.conversation').height(windowH - topH - bottomH - 50);
    });

});