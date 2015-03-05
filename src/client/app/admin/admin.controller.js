(function(){
  'use strict';

  angular
    .module('uiApp.admin')
    .controller('AdminCtrl', AdminFn);


  AdminFn.$inject = ['StatusService','StatusModel'];

  function AdminFn(StatusService,StatusModel) {
    var self = this;

    self.network= [];
    self.networkModel = [];
    self.selectedNetwork;

    self.selectNetwork = selectNetwork;
    self.toggleCell = toggleCell;
    self.toggleColumn = toggleColumn;
    self.toggleRow = toggleRow;

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

    function toggleCell(data){
      data.isSelected = !data.isSelected;
    }
    function toggleColumn(data){
      for(var i =0;i< self.selectedNetwork.locations.length;i++){
        for(var k =0;k< self.selectedNetwork.locations[i].services.length;k++) {
          if(data.code === self.selectedNetwork.locations[i].services[k].code){
            self.selectedNetwork.locations[i].services[k].isSelected = !self.selectedNetwork.locations[i].services[k].isSelected
          }
        }
      }
    }
    function toggleRow(data){
      for(var i =0;i< data.services.length;i++){
        data.services[i].isSelected = !data.services[i].isSelected
      }
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


