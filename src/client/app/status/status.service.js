(function(){
  'use strict';

  angular
    .module('uiApp.status')
    .factory('StatusService', StatusService);

  StatusService.$inject = ['$http'];

  function StatusService($http){

    var service = {
      getStatus: getStatus,
      updateStatus:updateStatus,
      createNews: createNews,
      getNews: getNews
    };

    /******* implementations *********/

    function getStatus(pageSize,currentpage) {
      return $http({method: 'GET', url: '/api/v1/status' }).
        success(function(data) {
          return data;
        }).
        error();
    }

    function updateStatus(report) {
      return $http({method: 'POST', url: '/api/v1/status', data:report }).
        success(function(data) {
          return data;
        }).
        error(function(err){
          console.log(err);
        });
    }

    function createNews(news) {
      return $http({method: 'POST', url: '/api/v1/status/news', data:news }).
        success(function(data) {
          return data;
        }).
        error();
    }

    function getNews(period) {
      console.log();
      console.log("i am from admin");
      //if(!period){period = 48;}
      return $http({method: 'GET', url: '/api/v1/status/news' }).
        success(function(data) {
          return data;
        }).
        error();
    }

    return service;

  }

}());
