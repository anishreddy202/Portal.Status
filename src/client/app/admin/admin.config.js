(function () {
  'use strict';

  angular
    .module('uiApp.admin', ['uiApp.status'])
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
