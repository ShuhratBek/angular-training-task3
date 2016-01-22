'use strict';

angular
	.module('task3App')
	.config(theme);

	theme.$inject = ['$mdThemingProvider'];

	function theme($mdThemingProvider) {
		// Theme configuration for angular-material
		$mdThemingProvider
			.theme('default')
			.primaryPalette('teal');
	}