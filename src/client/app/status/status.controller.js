(function(){
  'use strict';

  angular
    .module('uiApp.status')
    .controller('StatusCtrl', StatusFn);


  StatusFn.$inject = ['StatusService'];

  function StatusFn(StatusService) {

    var self = this;

    init();

    function init(){
      StatusService.getStatus()
        .then(function(response) {
          console.log(response);
        })
        .catch();
    }

  }

})();


