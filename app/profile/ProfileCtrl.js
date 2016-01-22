'use strict';

angular.module("app")
	.controller("ProfileCtrl", ProfileCtrl);

ProfileCtrl.$inject = ['$rootScope', '$timeout', 'userService'];

function ProfileCtrl($rootScope, $timeout, userService) {
	var vm = this;

	vm.user = {};
	vm.userTemp = {};
	vm.pwdType = 'password';
	vm.pwdIcon = 'visibility_off';
	vm.selectedIndex = 0;
	loadData();

	function loadData() {
		userService.profile().then(function(data){
			vm.user = data;
			vm.userTemp = data;
		});
	}
	vm.submit = function(isValid) {
		if(isValid) {
            $rootScope.loading = true;
            vm.user = {};
			angular.copy(vm.userTemp, vm.user);
			userService.msg('Updated succesfully!');
            $timeout(function() {
              $rootScope.loading = false;
            }, 3000);
            vm.selectedIndex = 0;
		}
	}
	vm.pwdVisible = function() {
		if (vm.pwdType === 'password') {
	    	vm.pwdType = 'text';
			vm.pwdIcon = 'visibility';
	    } else {
	      	vm.pwdType = 'password';
			vm.pwdIcon = 'visibility_off';
	    }
	}
}