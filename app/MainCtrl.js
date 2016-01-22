'use strict';
angular.module("app")
	.controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ['userService'];

function MainCtrl(userService) {
	var vm = this;
	userService.getAvatar();
	vm.isLoggedIn = userService.isLoggedIn;
}