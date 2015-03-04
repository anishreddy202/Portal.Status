(function () {
  'use strict';

  angular
    .module('uiApp.admin', [])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl as vm',
        authenticate:true
      });
  }

})();
