(function(){
	'use strict';
	angular.module("app")
		.controller("SigninCtrl", ['userService', function(userService) {
			var vm = this;
			vm.user = {};
			vm.formDisabled = false;

			vm.submit = function(isValid) {
				if(isValid) {
					vm.hasError = '';
					vm.formDisabled = true;
					userService.signIn(vm.user).then(function(data){
						if(!data) {
							vm.hasError = 'Task3App.msg.incorrectSignIn';
						} else {
							vm.hasError = '';
						}
						vm.formDisabled = false;
					}, function(data){
						vm.hasError = data || "Task3App.msg.requestFailed";
						vm.formDisabled = false;
					});
				}
			}
		}]);
})();