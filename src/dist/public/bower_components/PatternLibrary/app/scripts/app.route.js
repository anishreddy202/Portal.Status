(function(){
  'use strict';

  angular
    .module('app')
    .config(Config);

  Config.$inject = ['$routeProvider'];

  function Config($routeProvider) {

    var routes = [
      'main','signin','list','signup','505','400','lock','blank',
      'ui/typography', 'ui/components', 'ui/icons', 'ui/buttons', 'ui/forms', 'ui/colors',
      'pages/404', 'pages/500', 'pages/blank'
    ];

    var setRoutes = function setRoutes(route) {
      var config, url;
      url = '/' + route;
      config = {
        templateUrl: 'views/' + route + '.html'
      };
      $routeProvider.when(url, config);
      return $routeProvider;
    };

    routes.forEach(function(route) {
      return setRoutes(route);
    });

    $routeProvider
      .when('/', {redirectTo: '/main'})
      .when('/404', {templateUrl: 'views/pages/404.html'})
      .otherwise({ redirectTo: '/404'});
  }


}());

