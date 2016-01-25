(function(){
	'use strict';

	angular
		.module('app')
		.constant('appConfig', {
			langs: [
				{
					name: 'Task3App.langs.RU.name',
					tooltip: 'Task3App.langs.RU.tooltip',
					lang: 'ru'
				},
				{
					name: 'Task3App.langs.EN.name',
					tooltip: 'Task3App.langs.EN.tooltip',
					lang: 'en'
				}
			]
		})
		.config(['$mdThemingProvider', function($mdThemingProvider) {
			// Theme configuration for angular-material
			$mdThemingProvider
				.theme('default')
				.primaryPalette('teal');
		}])
		.config(['$translateProvider', function($translateProvider) {
			$translateProvider
				.useStaticFilesLoader({
					prefix: './lang/lang-',
					suffix: '.json'
				})
				.preferredLanguage('en')
				.useMissingTranslationHandlerLog()
				.useSanitizeValueStrategy(null);;
		}])
		.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
			IdleProvider.idle(1000);
			IdleProvider.timeout(1000);
			KeepaliveProvider.interval(10000);
		}]);
})();