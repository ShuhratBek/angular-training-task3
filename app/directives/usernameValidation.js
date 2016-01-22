(function(){
	'use strict';
	angular.module('app')
		.directive('usernameValidation', function() {
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					// validate incorrect
					ctrl.$validators.incorrect = function(modelValue, viewValue) {
						return (/^[a-zA-Z0-9]+$/).test(viewValue);
				    };
				}
			};
		});
})();