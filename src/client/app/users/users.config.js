(function(){
  'use strict';

  angular
    .module('uiApp.users', [])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'UsersCtrl',
        authenticate:true
      });
  }

})();
