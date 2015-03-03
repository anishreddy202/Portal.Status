(function() {
  'use strict';

  angular
    .module('uiApp')
    .factory('authService',authService);

  authService.$inject = ['$q', '$cookieStore', '$http', 'User'];

    function authService($q, $cookieStore, $http, User) {
      var currentUser = {};

      if($cookieStore.get('token')) {
        currentUser = User.get();
      }

      var service =  {

        getCurrentUser: getCurrentUser,
        getToken: getToken,
        login: login,
        isLoggedIn: isLoggedIn,
        isLoggedInAsync:isLoggedInAsync ,
        logout: logout
      };

      return service;

      function getCurrentUser() {
        return currentUser;
      }

      function getToken() {
        return $cookieStore.get('token');
      }

      function isLoggedIn() {
        return currentUser.hasOwnProperty('id');
      }

      function login(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        console.log("i am here");
        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
          success(function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            deferred.resolve(data);
            return cb();
          }).
          error(function(err) {
            logout();
            deferred.reject(err);
            return cb(err);
          });

        return deferred.promise;
      }

      function logout() {
        $cookieStore.remove('token');
        currentUser = {};
      }

      function isLoggedInAsync(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      }

    }

}());
