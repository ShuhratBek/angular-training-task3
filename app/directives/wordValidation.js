(function(){
	'use strict';
	angular.module('app')
		.directive('wordValidation', function() {
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					// validate incorrect
					ctrl.$validators.incorrect = function(modelValue, viewValue) {
						return (/^([A-Z][a-z]+)\s?([A-Z][a-z]+)?$/).test(viewValue);
				    };
				}
			};
		});
})();