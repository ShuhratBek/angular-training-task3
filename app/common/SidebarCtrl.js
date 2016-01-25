(function(){
	'use strict';

	angular.module('app')
		.controller('SidebarCtrl', ['$scope', '$translate', '$mdSidenav', 'appConfig', 'userService', function($scope, $translate, $mdSidenav, appConfig, userService) {
			var vm = this;
			vm.isLoggedIn = userService.isLoggedIn; // The state of login
			userService.profile().then(function(data) {
				vm.user = data;
			})
		}]);
})();