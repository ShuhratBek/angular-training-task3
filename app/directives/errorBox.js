(function(){
	'use strict';
	angular.module('app')
		.directive('errorBox', function() {
			return {
				restrict: 'EA',
				transclude: true,
				templateUrl: './app/common/errorBox.tpl.html'
			};
		});
})();