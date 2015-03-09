(function(){
  'use strict';

  angular
    .module('uiApp.users')
    .factory('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http){

    var service = {
      getUsers: getUsers,
      createUser:createUser,
      updateUser:updateUser,
      deleteUser:deleteUser,
      searchUser:searchUser,
      get:get
    };

    /******* implementations *********/

    function getUsers(pageSize,currentpage) {
      return $http({method: 'GET', url: '/api/v1/users?pageSize='+pageSize+'&pageIndex='+currentpage }).
        success(function(data) {
          return data;
        }).
        error();
    }

    function createUser(user) {
      return $http({method: 'POST', url: '/api/v1/users/', data:user }).
        success(function(data) {
          return data;
        }).
        error();
    }

    function updateUser(user) {

      return $http.put('/api/v1/users/'+user.id,user).
      //return $http({method: 'PUT', url: '/api/v1/users/' + user.id, data:user }).
        success(function(data) {
          return data;
        }).
        error();
    }

    function deleteUser(id) {
      return $http({method: 'DELETE', url: '/api/v1/users/' + id }).
        success(function(data) {
          return data;
        }).
        error();
    }

    function searchUser(text) {
      return $http({method: 'GET', url: '/api/v1/users/search/'+ text }).
        success(function(data) {
          return data;
        }).
        error();
    }

    function get() {
      return $http({method: 'GET', url: 'api/v1/users/me' }).
        success(function(data) {
          return data;
        }).
        error();
    }

    return service;

  }

}());
