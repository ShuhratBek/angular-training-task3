'use strict';

angular.module("app")
	.controller("ForgotCtrl", ForgotCtrl);

ForgotCtrl.$inject = ['$mdToast', '$mdDialog', 'userService'];

function ForgotCtrl($mdToast, $mdDialog, userService) {
	var vm = this;
	vm.user = {};
	vm.submit = function(isValid) {
		if(isValid) {
			userService.forgot(vm.user).then(function(data){
				if(data) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title("This is your password. Don't loose it!")
						.textContent(data)
						.ariaLabel('Forgot password')
						.ok('Got it!')
				    );
				}
			});
		}
	};
}