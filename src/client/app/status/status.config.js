(function () {
  'use strict';

  angular
    .module('uiApp.status', [])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('status', {
        url: '/',
        templateUrl: 'app/status/status.html',
        controller: 'StatusCtrl as vm'
      });
  }

})();
