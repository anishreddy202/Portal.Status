(function(){
  'use strict';

  angular
    .module('uiApp.news')
    .factory('NewsService', NewsService);

  NewsService.$inject = ['$http'];

  function NewsService($http){

    var service = {
      createNews: createNews,
      getNews: getNews
    };

    /******* implementations *********/

    function createNews(news) {
      return $http({method: 'POST', url: '/api/v1/news', data:news }).
        success(function(data) {
          return data;
        }).
        error();
    }

    function getNews() {
      return $http({method: 'GET', url: '/api/v1/news' }).
        success(function(data) {
          return data;
        }).
        error();
    }

    return service;

  }

}());
