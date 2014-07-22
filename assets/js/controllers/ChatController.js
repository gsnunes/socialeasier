'use strict';
window.app.controller('ChatCtrl', function ($rootScope, $scope, socket) {
	console.log(socket);
	$scope.$on('$viewContentLoaded', function() {
		var topH = $('.header').height(),
		bottomH = $('.bottom-chat').height(),
		windowH = $(window).height();

		$('.conversation').height(windowH - topH - bottomH - 50);
    });

    $scope.talks = [1, 2];
    $scope.users = [1, 2];

}); 