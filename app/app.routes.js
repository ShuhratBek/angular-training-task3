(function(){
  'use strict';

  angular
    .module('app')
      .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        //$locationProvider.html5Mode(true);
        //
        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
          .state('login', {
            url: "/",
            templateUrl: "app/pages/signin/signin.tpl.html",
            controller: "SigninCtrl",
            controllerAs: "vm",
            loginRequired: false
          })
          .state('forgot', {
            url: "/forgot",
            templateUrl: "app/pages/forgot/forgot.tpl.html",
            controller: "ForgotCtrl",
            controllerAs: "vm",
            loginRequired: false
          })
          .state('profile', {
            url: "/profile",
            templateUrl: "app/pages/profile/profile.tpl.html",
            controller: "ProfileCtrl",
            controllerAs: "vm",
            loginRequired: true
          })
          .state('edit', {
            url: "/edit",
            templateUrl: "app/pages/edit/edit.tpl.html",
            controller: "EditCtrl",
            controllerAs: "vm",
            loginRequired: true
          })
          .state('logout', {
            url: "/logout",
            controller: function($state, userService) {
              userService.logOut();
              $state.go('login');
            },
            loginRequired: true
          })
          .state('dashboard', {
            url: "/dashboard",
            templateUrl: "app/pages/dashboard/dashboard.tpl.html",
            loginRequired: true
          });

          $httpProvider.interceptors.push(function($q, $location, $rootScope) {
            return {
              request: function(config) {
                $rootScope.$broadcast('pageLoading', true);
                return config || $q.when(config)
              },
              response : function(response) {
                $rootScope.$broadcast('pageLoading', false);
                return response || $q.when(response);
              },
              responseError: function(response) {
                $rootScope.$broadcast('pageLoading', false);
                if(response.status === 401 || response.status === 403) {
                  $location.path('/login');
                }
                return $q.reject(response);
              }
            };
          });
      }])
      .run(['$rootScope', '$state', '$cookies', 'userService', 'Idle', 'Keepalive', function($rootScope, $state, $cookies, userService, Idle, Keepalive) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          Idle.watch();
          if(toState.loginRequired && !userService.isLoggedIn() && toState.name !== 'login'){
            event.preventDefault();
            userService.logOut();
            $state.go('login');
          }
          if(userService.isLoggedIn() && toState.name === 'login'){
            event.preventDefault();
            $state.go('profile');
          }
        });
        $rootScope.$on('pageLoading', function(event, data) {
          userService.setLoading(data);
        });
        $rootScope.$on('IdleTimeout', function() {
          userService.logOut();
          $state.go('logout');
        });
      }]);
})();