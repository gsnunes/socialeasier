'use strict';
window.app.controller('LoginModalCtrl', function ($scope, $modalInstance) {
	$scope.user = {};
	$scope.ok = function () {
		$modalInstance.close($scope.user);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});