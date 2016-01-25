(function(){
	'use strict';

	angular.module("app")
		.controller("ProfileCtrl", ['$rootScope', 'userService', function($rootScope, userService) {
			var vm = this;
			vm.user = {}; // Default form empty object
			
			loadData(); // This realized to call many times when needed

			function loadData() {
				vm.formDisabled = true;
				userService.profile().then(function(data) {
					vm.user = data;
					vm.formDisabled = false;
				}, function(data) {
					vm.formDisabled = false;
				});
			}
		}]);
})();