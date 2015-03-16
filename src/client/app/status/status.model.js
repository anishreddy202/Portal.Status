(function(){
  'use strict';

  angular
    .module('uiApp.status')
    .factory('StatusModel', StatusModel);

  StatusModel.$inject = [];

  function StatusModel(){

    var model = {
      network: network
    };


    function network(data){

      var self = {};
      self.name = data.name;
      self.classname = mapClassName(data.name);
      self.code = data.code;
      self.systems = mapNetworkSystems(data.systems);
      self.locations = mapLocationServices(data.services);
      self.services = mapNetworkServices(data.services);
      self.status = mapSuccessCount(self.locations);

      return self;

    }

    function System(data){
      var self = {};

      self.name = data.name.toLowerCase().replace('cdn','CDN').replace('upl','UpL');
      self.code = data.code;
      self.id = data.code
      self.status = data.status;
      return self
    }

    function Location(data){
      var self = {};

      self.name = data.name.toLowerCase();
      self.region =data.region.toLowerCase();
      self.code = data.code.toLowerCase();
      self.id = data.code;
      self.isSelected = false;
      self.services =[]

      return self;
    }

    function Service(data){
      var self = {};

      self.name = data.name.toLowerCase().replace('waf','WAF').replace('can','CAN').replace('api','API').replace('adn','ADN')
                  .replace('http','HTTP').replace('cdn','CDN').replace('upl','UpL').replace('ftp','FTP').replace('edgecast','EdgeCast');
      self.code = data.code;
      self.id = data.code;
      self.enabled = true;
      self.status = 'OK';
      self.isSelected = false;
      return self;
    }

    /** private **/

    function mapNetworkSystems(data){
      var systems = [];

      angular.forEach(data, function(item, i){
        systems.push(new System(item));
      });

      return systems;
    }

    function mapNetworkServices(data){
      var services = []

      angular.forEach(data, function(item, i){
        services.push(new Service(item));
      });

      return services;
    }

    function mapLocationServices(services){
      var locations = [];

      for(var i = 0; i< services[0].locations.length;i++){

        var loc = new Location(services[0].locations[i]);

        for(var j=0;j< services.length;j++ ){

          var svc = new Service(services[j]);

          for(var k=0;k< services[j].locations.length;k++ ){
            if( services[j].locations[k].code === loc.code.toUpperCase()){
              svc.enabled = services[j].locations[k].enabled;
              svc.status = services[j].locations[k].status;
            }
          }

          //_.each(services[j].locations, function(item, i){
          //    if(item.code === loc.code.toUpperCase()){
          //      svc.enabled = item.enabled;
          //      svc.status = item.status;
          //    }
          //});

          loc.services.push(svc);
        }
        locations.push(loc);
      }
      return locations;
    }

    function mapSuccessCount(location){
      var statusCount = {}
      statusCount.count = 0
      statusCount.maintance = false;
      statusCount.warning = false;
      statusCount.error = false;

      for(var i = 0;i< location.length;i++){

        var hasErrors = false
        for(var j =0;j< location[i].services.length;j++){
          if(location[i].services[j].status !== 'OK' || location[i].services[j].enabled !== true ){
            hasErrors = true;
          }

        }

        for(var j =0;j< location[i].services.length;j++){
          if(location[i].services[j].status === 'ERR' ){
            statusCount.error = true;
          }
        }

        for(var j =0;j< location[i].services.length;j++){
          if(location[i].services[j].status === 'MNT' ){
            statusCount.maintance = true;
          }
        }

        for(var j =0;j< location[i].services.length;j++){
          if(location[i].services[j].status === 'DGR' ){
            statusCount.warning = true;
          }
        }

        if(!hasErrors) {statusCount.count ++}

      }
      return statusCount;

    }

    function mapClassName(data){
      if(data === 'DELIVER'){
        return 'cdn';
      }
      else if(data === 'DEFEND'){
        return 'shield';
      }
      else if(data === 'TRANSACT'){
        return 'transact';
      }
      else if(data === 'ACCELERATE'){
        return 'gauge';
      }
      else if(data === 'STORE'){
        return 'store';
      }
      else if(data === 'ROUTE'){
        return 'route';
      }
    }


    return model
  }

}());


