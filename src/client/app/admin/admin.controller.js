(function(){
  'use strict';

  angular
    .module('uiApp.admin')
    .controller('AdminCtrl', AdminFn);


  AdminFn.$inject = ['StatusService','StatusModel','$rootScope','$modal'];

  function AdminFn(StatusService,StatusModel,$rootScope,modal) {
    var self = this;

    self.network= [];
    self.networkModel = [];
    self.selectedNetwork;

    self.statuses = ["OK","ERR","MNT","DGR"];



    self.selectNetwork = selectNetwork;
    self.toggleCell = toggleCell;
    self.toggleColumn = toggleColumn;
    self.toggleRow = toggleRow;
    self.updateStatus = updateStatus;
    self.open = open;

    init();

    function init(){
      StatusService.getStatus()
        .then(function(response) {
          MapNetworkStatus(response.data)
          self.selectedNetwork = self.network[0];
          $rootScope.network = self.network;
        })
        .catch();
    }

    function selectNetwork(network){
      self.selectedNetwork = network;
      console.log(self.selectedNetwork);
    }

    function toggleCell(data){
      data.isSelected = !data.isSelected;
      $rootScope.selectedNetwork = data;
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

    function updateStatus(){
      self.selectedLocations = [];
      console.log(self.selectedNetwork);

      for(var i =0;i< self.selectedNetwork.locations.length;i++){
        var locationObj = {};
        locationObj.locationCode = self.selectedNetwork.locations[i].code;
        locationObj.locationName = self.selectedNetwork.locations[i].name;
        locationObj.services = [];
        for(var k =0;k< self.selectedNetwork.locations[i].services.length;k++){

          if(self.selectedNetwork.locations[i].services[k].isSelected){
            var obj = {
              "serviceName":self.selectedNetwork.locations[i].services[k].name,
              "serviceCode":self.selectedNetwork.locations[i].services[k].code
            }
            locationObj.services.push(obj);
          }
        }
        if(locationObj.services.length > 0){
          self.selectedLocations.push(locationObj);
        }

      }
      console.log(self.selectedLocations);
      self.open();
    }

    function open() {
      var modalInstance = modal.open({
        templateUrl: 'app/admin/status-modal.html',
        controller: function(){
          this.items = self.statuses;
          this.selectedLocations = self.selectedLocations;
          console.log(this.selectedLocations);
          this.selectedState = "OK";
          this.changeState = function(data){
            this.selectedState = data;
          }
          this.update = function(){

          }

          this.status = {
            isopen: false
          };

          this.toggled = function(open) {
            $log.log('Dropdown is now: ', open);
          };

          this.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
          };

          //this.loggedInUser = self.loggedInUser;
          //this.newUser = self.newUser;

          //this.cancel = function(){
          //  modalInstance.dismiss('cancel');
          //};
          //this.save = function(){
          //  self.selectedUser = this.selectedUser;
          //  self.saveUser();
          //  modalInstance.dismiss('cancel');
          //};
          //this.delete = function(){
          //  self.selectedUser = this.selectedUser;
          //  self.deleteUser();
          //  modalInstance.dismiss('cancel');
          //};
        },
        controllerAs: 'StatusCtrl'
      });
    }

  }

})();

