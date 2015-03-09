(function() {
  'use strict';

    function userService($resource) {
      return $resource('/api/v1/users/:id', { id: '@_id' }, {
        get: {
            method: 'GET',
            params: { id:'me' }
          }
        }
      );
    }

  angular
    .module('uiApp')
    .factory('User', ['$resource', userService]);

}());
