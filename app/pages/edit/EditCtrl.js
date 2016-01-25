(function(){
	'use strict';

	angular.module("app")
		.controller("EditCtrl", ['$state', 'userService', function($state, userService) {
			var vm = this;
			vm.user = {}; // Default form empty object
			vm.pwdType = 'password'; // Current password input type
			vm.pwdIcon = 'visibility_off'; // Current password icon
			vm.formDisabled = false;

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

			vm.submit = function(isValid) {
				if(isValid) {
					vm.formDisabled = true;
					userService.setProfile(vm.user).then(function(data) {
						if(data) {
							userService.msg('Task3App.msg.updateSuccessfully');
							$state.go('profile');
						} else {
							vm.hasError = 'Task3App.msg.updateFailed';
						}
						vm.formDisabled = false;
					}, function(data) {
						vm.hasError = data || "Task3App.msg.requestFailed";
						vm.formDisabled = false;
					});
				}
			};
			vm.pwdVisible = function() {
				if (vm.pwdType === 'password') {
			    	vm.pwdType = 'text';
					vm.pwdIcon = 'visibility';
			    } else {
			      	vm.pwdType = 'password';
					vm.pwdIcon = 'visibility_off';
			    }
			};
		}]);
})();