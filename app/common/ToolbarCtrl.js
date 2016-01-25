(function(){
	'use strict';

	angular.module('app')
		.controller('ToolbarCtrl', ['$scope', '$translate', '$mdSidenav', 'appConfig', 'userService', function($scope, $translate, $mdSidenav, appConfig, userService) {
			var vm = this;
			vm.isFabOpen = false; // The state of FAB speed dial
			vm.langs = appConfig.langs; // Arrays of languages from constant
			
			vm.isLoggedIn = userService.isLoggedIn; // The state of login
			vm.toggleSideNav = function() {
				$mdSidenav('left').toggle();
			};

			vm.pageLoading = function() {
				return userService.isLoading();
			};
			/**
			 * Switch language
			 */
			vm.switchLang = function(lang) {
				$translate.use(lang);
			};

			/**
			 * Check lang is current language
			 */
			vm.currentLang = function(lang) {
				return ($translate.proposedLanguage() || $translate.use() === lang);
			};

			// On opening, add a delayed property which shows tooltips after the speed dial has opened
			// so that they have the proper position; if closing, immediately hide the tooltips
			$scope.$watch('vm.isFabOpen', function(isOpen) {
				if (isOpen) {
					$timeout(function() {
						$scope.tooltipVisible = vm.isFabOpen;
					}, 600);
				} else {
					$scope.tooltipVisible = vm.isFabOpen;
				}
			});
		}]);
})();