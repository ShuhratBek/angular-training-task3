(function(){
	'use strict';
	angular.module('app')
		.directive('sidebar', function() {
			return {
				restrict: 'EA',
				replace: true,
				templateUrl: './app/common/sidebar.tpl.html',
				controller: 'SidebarCtrl',
				controllerAs: 'sb'
			};
		});
})();