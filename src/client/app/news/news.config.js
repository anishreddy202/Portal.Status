(function () {
  'use strict';

  angular
    .module('uiApp.news', [])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('news', {
        url: '/news',
        templateUrl: 'app/news/news.html',
        controller: 'NewsCtrl as vm'
      });
  }

})();
