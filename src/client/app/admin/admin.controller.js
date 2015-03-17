(function(){
  'use strict';

  angular
    .module('uiApp.admin')
    .controller('AdminCtrl', AdminFn);


  AdminFn.$inject = ['StatusService','StatusModel','AdminDTOModel','$rootScope','$modal','$anchorScroll', '$location','NewsService', 'Analytics'];

  function AdminFn(StatusService,StatusModel,AdminDTOModel,$rootScope,modal, $anchorScroll,$location,NewsService, Analytics) {
    var self = this;

    var original =[]
    self.network= [];
    self.networkModel = [];
    self.selectedNetwork = null;
    self.news=[];
    self.productNews = [];
    var selectedNetworkCache = null;
    self.selectedNetworkChange = true;

    self.statuses = ['OK','ERR','MNT','DGR'];


    self.selectNetwork = selectNetwork;
    self.toggleCell = toggleCell;
    self.toggleColumn = toggleColumn;
    self.toggleRow = toggleRow;
    self.updateStatus = updateStatus;
    self.open = open;
    self.gotoNews = gotoNews;
    self.enableService = enableService;
    self.openEnableService = openEnableService;


    init();

    function init(){
      StatusService.getStatus()
        .then(function(response) {

          original = response.data;
          mapNetworkStatus(response.data);
          self.selectedNetwork = self.network[0];
          selectedNetworkCache = angular.copy(self.selectedNetwork);
          getNews();

          Analytics.trackPage('/admin');
        })
        .catch();

    }

    function getNews(){
      NewsService.getNews()
        .then(function(response) {

        self.news = response.data;
          self.productNews = [];
         for(var i =0;i< self.news.length;i++){
           if(self.news[i].product.code === self.selectedNetwork.code){
             self.productNews.push(self.news[i]);
           }
         }

          self.news = response.data;
        })
        .catch();
      Analytics.trackEvent('News', 'get',self.news);
      Analytics.trackTrans();
    }

    function selectNetwork(network){
      self.productNews = [];
      self.selectedNetwork = network;
      for(var i =0;i< self.news.length;i++){
        if(self.news[i].product.code === self.selectedNetwork.code){
          self.productNews.push(self.news[i]);
        }
      }
      Analytics.trackEvent('Network', 'Select',network);
      Analytics.trackTrans();
    }

    function toggleCell(data){
      if(data.enabled) {
        data.isSelected = !data.isSelected;
      }

      self.selectedNetworkChange = angular.equals(selectedNetworkCache, self.selectedNetwork);

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

      self.selectedNetworkChange = angular.equals(selectedNetworkCache, self.selectedNetwork);

    }

    function toggleRow(data){
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

      self.selectedNetworkChange = angular.equals(selectedNetworkCache, self.selectedNetwork);

    }

    function gotoNews(){
      var newHash = 'news';
      if ($location.hash() !== newHash) {
        $location.hash('news');
      } else {
        $anchorScroll();
      }
      Analytics.trackEvent('News', 'goto','');
      Analytics.trackTrans();
    }

    function enableService(){
      self.openEnableService();
    }

    /**private functions **/

    function mapNetworkStatus(data){
      for(var i = 0; i< data.length;i++){
        var network = new StatusModel.network(data[i]);
        self.network.push(network);
      }
    }

    function updateStatus(){

      self.selectedLocations = [];

      var dto = new AdminDTOModel.network(self.selectedNetwork);

        for(var i =0;i< dto.services.length;i++){
          var ServiceObj = {};
          ServiceObj.code = dto.services[i].code;
          ServiceObj.name = dto.services[i].name;
          ServiceObj.locations = [];
          for(var k =0;k< dto.services[i].locations.length;k++){

            if(dto.services[i].locations[k].isSelected){
              var obj = {
                'name':dto.services[i].locations[k].name,
                'code':dto.services[i].locations[k].code
              }
              ServiceObj.locations.push(obj);
            }
          }
          if(ServiceObj.locations.length > 0) {
            self.selectedLocations.push(ServiceObj);
          }

        }
        self.open();

      Analytics.trackEvent('Network', 'updateClick','');
    }

    function updateNetworkStatus(news){

      var dto = new AdminDTOModel.network(self.selectedNetwork);

      angular.forEach(original, function(item, i){
        if(item.code === dto.code ){
          original[i] = dto;
        }
      });

      StatusService.updateStatus(original)
        .then(function(response) {
          self.network= [];
          self.networkModel = [];
          mapNetworkStatus(response.data);
          selectedNetworkCache = angular.copy(self.selectedNetwork);
          self.selectedNetworkChange = angular.equals(selectedNetworkCache, self.selectedNetwork);

          angular.forEach(self.network, function(item, i){
            if(item.code === self.selectedNetwork.code ){
              self.selectedNetwork = item;
            }
          });

          if(news !== null) {
            createNews(news)
          }
          Analytics.trackEvent('Network', 'update','');
          Analytics.trackTrans();

        })
        .catch();

    }

    function createNews (news) {
      NewsService.createNews(news)
        .then(function(response) {
            getNews();
        })
        .catch();
    }

    function open() {
      var modalInstance = modal.open({
        templateUrl: 'app/admin/status-modal.html',
        controller: function(){
          this.items = self.statuses;
          this.selectedLocations = self.selectedLocations;
          this.selectedState = 'OK';
          this.comment = '';
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

            news.product = {'name': self.selectedNetwork.name,'code':self.selectedNetwork.code};
            news.status = this.selectedState;
            news.comment = this.comment;
            news.services = this.selectedLocations;
            news.dateTime = new Date();

            updateNetworkStatus(news);
            modalInstance.dismiss('cancel');
          };
          this.cancel = function(){
            for(var i =0;i< self.selectedNetwork.locations.length;i++){
              for(var k =0;k< self.selectedNetwork.locations[i].services.length;k++){
                if(self.selectedNetwork.locations[i].services[k].isSelected){
                  self.selectedNetwork.locations[i].services[k].isSelected = false;
                }
              }
            }
            self.selectedNetworkChange = angular.equals(selectedNetworkCache, self.selectedNetwork);
            modalInstance.dismiss('cancel');
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
          defaultLocation.name = 'Select Location'
          this.enableService = true;
          this.enableOptions = [true,false];
          this.enable = function(data){
            this.enableService = data;
          };
          this.services = self.selectedNetwork.services;
          this.locations = self.selectedNetwork.locations;
          this.selectedLocation = defaultLocation;
          this.selectedService = {name:'Select Service'};
          this.selectLocation = function(data){
            this.selectedLocation = data;
          };
          this.selectService = function(data){
            this.selectedService = data;
          };
          this.update = function(){
            for(var i =0;i< self.selectedNetwork.locations.length;i++){
              if(self.selectedNetwork.locations[i].code === this.selectedLocation.code) {
                for (var k = 0; k < self.selectedNetwork.locations[i].services.length; k++) {

                  if (self.selectedNetwork.locations[i].services[k].code === this.selectedService.code) {
                    self.selectedNetwork.locations[i].services[k].enabled = this.enableService;
                    self.selectedNetwork.locations[i].services[k].status = 'OK'
                  }
                }
              }
            }
            updateNetworkStatus(null);
            modalInstance2.dismiss('cancel');
          };
        },
        controllerAs: 'vm'
      });
    }


  }

})();

