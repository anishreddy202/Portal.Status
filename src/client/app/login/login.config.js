(function () {
  'use strict';

  angular
    .module('uiApp.login', [])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl as LoginCtrl'
      });
  }

})();
