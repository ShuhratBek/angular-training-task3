'use strict';
angular.module("app")
	.controller("SigninCtrl", SigninCtrl);

SigninCtrl.$inject = ['userService'];

function SigninCtrl(userService) {
	var vm = this;
	vm.user = {};
	vm.submit = function(isValid) {
		if(isValid) {
			userService.signIn(vm.user);
		}
	}
}