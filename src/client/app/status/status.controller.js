(function(){
  'use strict';

  angular
    .module('uiApp.status')
    .controller('StatusCtrl', StatusFn);


  StatusFn.$inject = ['StatusService','StatusModel'];

  function StatusFn(StatusService,StatusModel) {

    var self = this;

    self.network= [];
    self.networkModel = [];
    self.selectedNetwork;

    self.selectNetwork = selectNetwork;

    init();

    function init(){
      StatusService.getStatus()
        .then(function(response) {
          MapNetworkStatus(response.data)
          self.selectedNetwork = self.network[0];
          console.log(self.selectedNetwork);
        })
        .catch();
    }

    function selectNetwork(network){
      self.selectedNetwork = network;
      console.log(self.selectedNetwork);
    }

    /**private functions **/

    function MapNetworkStatus(data){
      for(var i = 0; i< data.length;i++){
        var network = new StatusModel.network(data[i]);
        self.network.push(network);
      }
    }

  }

})();


