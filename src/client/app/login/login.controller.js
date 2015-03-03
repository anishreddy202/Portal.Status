(function(){
  'use strict';

  angular
    .module('uiApp.login')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$location','$window','authService'];

  function LoginCtrl ($location, $window,authService) {
    var self = this;

    self.user = {};
    self.errors = {};
    self.submitted = false;

    self.login = login;
    self.loginOauth = loginOauth;

    function login(form){
      self.submitted = true;

      if(form.$valid) {
        console.log(self.user.email);
        console.log(self.user.password);
        authService.login({
          email: self.user.email,
          password: self.user.password
        })
          .then( function() {
            // Logged in, redirect to home
            $location.path('/admin');
          })
          .catch( function(err) {
            self.errors.failed = true;
            if(err.message === undefined){
              self.errors.other = "System Error";
            }else{
              self.errors.other = err.message;
            }
          });
      }
    }

    function loginOauth(provider){
      $window.location.href = '/auth/' + provider;
    }
  }

})();


