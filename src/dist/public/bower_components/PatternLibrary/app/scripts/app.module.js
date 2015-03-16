(function() {

  'use strict';

  angular
    .module('app', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',

      // 3rd Party Modules
      'ui.bootstrap',

      // Custom Modules
      'app.ui',
      'app.ui.form'
  ]);

}());
