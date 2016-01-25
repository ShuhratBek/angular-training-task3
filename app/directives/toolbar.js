(function(){
	'use strict';
	angular.module('app')
		.directive('toolbar', function() {
			return {
				restrict: 'EA',
				replace: true,
				transclude: true,
				templateUrl: './app/common/toolbar.tpl.html',
				controller: 'ToolbarCtrl',
				controllerAs: 'tb'
			};
		});
})();