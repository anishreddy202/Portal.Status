'use strict';

angular.module('uiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'uiApp.status',
  'uiApp.login',
  'uiApp.news',
  'uiApp.users',
  'uiApp.admin',
  'angular-google-analytics'
])
  .config(config)
  .factory('authInterceptor',authInterceptor)
  .run(appRun);

function config ($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider, AnalyticsProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');

  AnalyticsProvider.setAccount('UA-60813302-1');
  AnalyticsProvider.trackPages(true);
  AnalyticsProvider.trackUrlParams(true);
  AnalyticsProvider.useDisplayFeatures(true);
  AnalyticsProvider.trackPrefix('VDMS-Status');
  AnalyticsProvider.useAnalytics(true);
  AnalyticsProvider.ignoreFirstPageLoad(false);
  AnalyticsProvider.useECommerce(true, false);
  AnalyticsProvider.useEnhancedLinkAttribution(true);
}


function authInterceptor($rootScope, $q, $cookieStore, $location){
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },
    responseError: function(response) {
      if(response.status === 401) {
        $location.path('/login');
        $cookieStore.remove('token');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    }
  };
}

function appRun($rootScope, $location, authService, Analytics) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    authService.isLoggedInAsync(function(loggedIn) {
      if (next.authenticate && !loggedIn) {
        $location.path('/login');
      }
    });
  });
}
88/29/29/29
