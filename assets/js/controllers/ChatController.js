'use strict';
window.app.controller('ChatCtrl', function ($rootScope, $scope, $modal, $http, socket) {

	$scope.$on('$viewContentLoaded', function() {
		var topH = $('.header').height(),
		bottomH = $('.bottom-chat').height(),
		windowH = $(window).height();

		$('.conversation').height(windowH - topH - bottomH - 50);
    });

    var loginModal = function () {
    	var modalInstance = $modal.open({
	      templateUrl: 'templates/login/index.html',
	      controller: 'LoginModalCtrl',
	      size: 'sm',
	      resolve: {
	        user: function () {
	          return $scope.user;
	        }
	      }
	    });

	    modalInstance.result.then(function (user) {
	    	console.log(user);
  			send({user: user});
		});
    },

    send = function (user) {
	    $http.post('/chat/join', user).success(function (data) {
	    	if(data.error && data.error.login) {
	    		loginModal();
	    	} else {
	    		$.cookie('user', user);
	    	}
	    });
    }

    send($.cookie('user'));

    // socket.on('connect', function () {
    // 	socket.emit('/chat', function (data) {
    // 		console.log(data);
    // 	});
    // });

}); 