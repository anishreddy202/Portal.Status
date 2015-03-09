(function(){
  'use strict';

  angular
    .module('uiApp.status')
    .factory('StatusService', StatusService);

  StatusService.$inject = ['$http'];

  function StatusService($http){

    var service = {
      getStatus: getStatus
    };

    /******* implementations *********/

    function getStatus(pageSize,currentpage) {
      return $http({method: 'GET', url: '/api/v1/status' }).
        success(function(data) {
          return data;
        }).
        error();
    }

    return service;

  }

}());
