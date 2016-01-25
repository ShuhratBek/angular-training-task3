(function(){
	'use strict';

	angular.module("app")
		.controller("ForgotCtrl", ['$mdDialog', '$filter', 'userService', function($mdDialog, $filter, userService) {
			var vm = this;
			vm.user = {}; // Default form empty object
			vm.formDisabled = false;

			/**
			 * Submit form
			 */
			vm.submit = function(isValid) {
				if(isValid) {
					vm.formDisabled = true;
					userService.forgot(vm.user).then(function(data){
						if(data) {
							$mdDialog.show(
								$mdDialog.alert()
								.clickOutsideToClose(true)
								.title($filter('translate')("Task3App.forgot.modal.title"))
								.textContent(data)
								.ariaLabel($filter('translate')("Task3App.forgot.modal.aria"))
								.ok($filter('translate')("Task3App.forgot.modal.ok"))
						    );
						} else {
							vm.hasError = 'Task3App.msg.usernameNotFound';
						}
						vm.formDisabled = false;
					}, function(data) {
						vm.hasError = data || "Task3App.msg.requestFailed";
						vm.formDisabled = false;
					});
				}
			};
		}]);
})();