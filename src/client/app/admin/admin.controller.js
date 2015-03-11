(function(){
  'use strict';

  angular
    .module('uiApp.admin')
    .controller('AdminCtrl', AdminFn);


  AdminFn.$inject = ['StatusService','StatusModel','AdminDTOModel','$rootScope','$modal','$anchorScroll', '$location'];

  function AdminFn(StatusService,StatusModel,AdminDTOModel,$rootScope,modal, $anchorScroll,$location) {
    var self = this;

    var original =[]
    self.network= [];
    self.networkModel = [];
    self.selectedNetwork;
    self.news=[];

    self.statuses = ["OK","ERR","MNT","DGR"];



    self.selectNetwork = selectNetwork;
    self.toggleCell = toggleCell;
    self.toggleColumn = toggleColumn;
    self.toggleRow = toggleRow;
    self.updateStatus = updateStatus;
    self.open = open;
    self.gotoNews = gotoNews;
    self.enableService = enableService;
    self.popsModal = popsModal;
    self.servicesModal = servicesModal;
    self.openEnableService = openEnableService;
    self.openPopsModal = openPopsModal;
    self.openServicesModal=openServicesModal;


    init();

    function init(){
      StatusService.getStatus()
        .then(function(response) {
          original = response.data;
          MapNetworkStatus(response.data)
          self.selectedNetwork = self.network[0];
          $rootScope.network = self.network;
        })
        .catch();

      StatusService.getNews()
        .then(function(response) {
          self.news = response.data;
        })
        .catch();
    }

    function selectNetwork(network){
      self.selectedNetwork = network;
    }

    function toggleCell(data){
      if(data.enabled) {
        data.isSelected = !data.isSelected;
        $rootScope.selectedNetwork = data;
      }
    }

    function toggleColumn(data){
      if(data.isSelected){
        data.isSelected = false;
      }
      else{
        data.isSelected = true;
      }
      for(var i =0;i< self.selectedNetwork.locations.length;i++){
        for(var k =0;k< self.selectedNetwork.locations[i].services.length;k++) {
          if(data.code === self.selectedNetwork.locations[i].services[k].code){
            if(self.selectedNetwork.locations[i].services[k].enabled) {
              self.selectedNetwork.locations[i].services[k].isSelected = data.isSelected
            }
          }
        }
      }
    }

    function toggleRow(data){
      console.log(data);
      if(data.isSelected){
        data.isSelected = false;
      }
      else{
        data.isSelected = true;
      }
      for(var i =0;i< data.services.length;i++){
        if(data.services[i].enabled) {
          data.services[i].isSelected = data.isSelected;
        }
      }
    }

    function gotoNews(){
      var newHash = 'news';
      if ($location.hash() !== newHash) {
        $location.hash('news');
      } else {
        $anchorScroll();
      }
    }

    function enableService(){
      self.openEnableService();
    }

    function popsModal(){
      self.openPopsModal();
    }

    function servicesModal(){
      self.openServicesModal();
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
        self.open();
    }

    function updateNetworkStatus(news){

      var dto = new AdminDTOModel.network(self.selectedNetwork);

      angular.forEach(original, function(item, i){
        if(item.code == dto.code ){
          original[i] = dto;
        }
      });

      StatusService.updateStatus(original)
        .then(function(response) {
          self.network= [];
          self.networkModel = [];
          MapNetworkStatus(response.data)

          angular.forEach(self.network, function(item, i){
            if(item.code == self.selectedNetwork.code ){
              self.selectedNetwork = item;
            }
          });

          if(news != null)
            createNews(news)

        })
        .catch();

    }


    function createNews (news) {
      StatusService.createNews(news)
        .then(function(response) {


        })
        .catch();
    }

    function open() {
      var modalInstance = modal.open({
        templateUrl: 'app/admin/status-modal.html',
        controller: function(){
          this.items = self.statuses;
          this.selectedLocations = self.selectedLocations;
          this.selectedState = "OK";
          this.comment;
          this.changeState = function(data){
            this.selectedState = data;
          };
          this.update = function(){
            for(var i =0;i< self.selectedNetwork.locations.length;i++){
              for(var k =0;k< self.selectedNetwork.locations[i].services.length;k++){

                if(self.selectedNetwork.locations[i].services[k].isSelected){
                  self.selectedNetwork.locations[i].services[k].status = this.selectedState
                }
              }
            }

            var news ={};

            news.status = this.selectedState;
            news.comment = this.comment;
            news.locations = this.selectedLocations;

            updateNetworkStatus(news);
            modalInstance.dismiss('cancel');
          };

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

        },
        controllerAs: 'StatusCtrl'
      });
    }

    function openEnableService() {
      var modalInstance2 = modal.open({
        templateUrl: 'app/admin/enableservice-modal.html',
        controller: function(){
          var defaultLocation = {};
          defaultLocation.name = "Select Location"
          this.enableService = true;
          this.enableOptions = [true,false];
          this.enable = function(data){
            this.enableService = data;
          };
          this.services = self.selectedNetwork.services;
          this.locations = self.selectedNetwork.locations;
          this.selectedLocation = defaultLocation;
          this.selectedService = {name:"Select Service"};
          this.selectLocation = function(data){
            this.selectedLocation = data;
          };
          this.selectService = function(data){
            this.selectedService = data;
          };
          this.update = function(){
            for(var i =0;i< self.selectedNetwork.locations.length;i++){
              if(self.selectedNetwork.locations[i].code == this.selectedLocation.code) {
                for (var k = 0; k < self.selectedNetwork.locations[i].services.length; k++) {

                  if (self.selectedNetwork.locations[i].services[k].code == this.selectedService.code) {
                    self.selectedNetwork.locations[i].services[k].enabled = this.enableService
                  }
                }
              }
            };
            updateNetworkStatus(null);
            modalInstance2.dismiss('cancel');
          };

        },
        controllerAs: 'vm'
      });
    }

    function openPopsModal() {
      var modalInstance = modal.open({
        templateUrl: 'app/admin/pops-modal.html',
        controller: function(){
        },
        controllerAs: 'vm'
      });
    }

    function openServicesModal() {
      var modalInstance3 = modal.open({
        templateUrl: 'app/admin/services-modal.html',
        controller: function(){
        },
        controllerAs: 'vm'
      });
    }

  }

})();


