'user strict';

angular
  .module('task3App')
  .config(router)
  .run(runApp);

  router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function router($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    //$locationProvider.html5Mode(true);
    //
    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('login', {
        url: "/",
        templateUrl: "app/signin/signin.html",
        controller: "SigninCtrl",
        controllerAs: "vm",
        loginRequired: false
      })
      .state('forgot', {
        url: "/forgot",
        templateUrl: "app/forgot/forgot.html",
        controller: "ForgotCtrl",
        controllerAs: "vm",
        loginRequired: false
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "app/profile/profile.html",
        controller: "ProfileCtrl",
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
      });

      $httpProvider.interceptors.push(function($q, $location, $rootScope, $timeout) {
        return {
          request: function(config) {
            $rootScope.loading = true;
            return config || $q.when(config)
          },
          response : function(response) {
            $timeout(function() {
              $rootScope.loading = false;
            }, 3000);
            return response || $q.when(response);
          },
          responseError: function(response) {
            $timeout(function() {
              $rootScope.loading = false;
            }, 3000);
            if(response.status === 401 || response.status === 403) {
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
      });
  };

  runApp.$inject = ['$rootScope', '$state', '$cookies', 'userService'];

  function runApp($rootScope, $state, $cookies, userService) {
    $rootScope.globals = angular.fromJson($cookies.get('globals')) || {};
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if(toState.loginRequired && !$rootScope.globals.currentUser && toState.name !== 'login'){
        event.preventDefault();
        userService.logOut();
        $state.go('login');
      }
      if($rootScope.globals.currentUser && toState.name === 'login'){
        event.preventDefault();
        $state.go('profile');
      }
    });
  };