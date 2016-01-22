(function(){
	'use strict';

	angular.module('app')
		.factory('userService', userService);

	userService.$inject = ['$rootScope', '$http', '$cookies', '$state', '$mdToast'];

	function userService($rootScope, $http, $cookies, $state, $mdToast) {
		var user = {
			signIn: signIn,
			isLoggedIn: isLoggedIn,
			logOut: logOut,
			msg: msg,
			profile: profile,
			forgot: forgot,
			getAvatar: getAvatar
		}

		return user;

		function signIn(formData) {
			$rootScope.globals = {};
            $http.post('login', formData).then(successCallback, errorCallback);
            function successCallback(response) {
            	var data = response.data;
            	if(data.success === true){
	            	$rootScope.globals = {
	    				currentUser: {
	    					id: data.id,
	    					username: formData.username
	    				}
	    			}
					$cookies.put('globals', angular.toJson($rootScope.globals));
	        		user.msg('Welcome ' + formData.username + '!');
					$state.go('profile');	
	        	} else {
	        		user.msg('Invalid username or password!');
	        	}
            }
            function errorCallback(response) {
            	user.msg(response.data || "Request failed");
            }
		}

		function forgot(formData) {
            return $http.post('forgot', formData).then(successCallback, errorCallback);
            function successCallback(response) {
            	var data = response.data;
            	if(data.success === true){
	            	return data.password;
	        	} else {
	        		user.msg('Username not found!');
	        	}
            }
            function errorCallback(response) {
            	user.msg(response.data || "Request failed");
            }
		}

		function profile() {
			return $http.get('getprofile/' + $rootScope.globals.currentUser.id).then(successCallback, errorCallback);

			function successCallback(response) {
				var data = response.data;
				if(data.success === true) {
					data.data.username = $rootScope.globals.currentUser.username;
					forgot({username: data.data.username}).then(function(res){
						data.data.password = res;
					});
					return data.data;
				} else {
	        		user.msg('Error!');
					return {};
				}
			}

			function errorCallback(response) {
				user.msg(response.data || "Request failed");
			}
		}

		function getAvatar() {
			$http.get('http://uifaces.com/api/v1/random').then(successCallback, errorCallback);

			function successCallback(response) {
				$rootScope.avatar = response.data.image_urls.normal;
			}

			function errorCallback(response) {
				$rootScope.avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/48.jpg';
			}
		}

		function isLoggedIn(){
    		if($rootScope.globals.currentUser) {
    			return true;
    		} else {
    			return false;
    		}
		}

		function logOut() {
            $rootScope.globals = {};
            $cookies.remove('globals');
		}

		function msg(text) {
			$mdToast.showSimple(text);
		}
	}
})();