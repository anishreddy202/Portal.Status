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
      var self = this;
      this.name = data.name;
      this.classname = MapClassName(data.name);
      this.code = data.code;
      this.systems = MapNetworkSystems(data.systems);
      this.locations = MapLocationServices(data.services);
      this.services = MapNetworkServices(data.services);
      this.status = MapSuccessCount(this.locations);

      return self;

    }

    function system(data){
      console.log(data);
      var self = this;
      this.name = data.name.toLowerCase().replace('cdn','CDN').replace('upl','UpL');
      this.code = data.code;
      this.status = data.status;
      return self
    }

    function location(data){
      var self = this;

      this.name = data.name.toLowerCase();
      this.region =data.region.toLowerCase();
      this.code = data.code.toLowerCase();
      this.services =[]

      return self;
    }

    function service(data){
      var self = this;
      this.name = data.name.toLowerCase().replace('waf','WAF').replace('can','CAN').replace('api','API').replace('adn','ADN')
                  .replace('http','HTTP').replace('cdn','CDN').replace('upl','UpL').replace('ftp','FTP').replace('edgecast','EdgeCast');
      this.code = data.code;
      this.enabled;
      this.status;
      return self;
    }

    /** private **/

    function MapNetworkSystems(data){
      var systems = [];

      angular.forEach(data, function(item, i){
        systems.push(new system(item));
      });

      return systems;
    }

    function MapNetworkServices(data){
      var services = []

      angular.forEach(data, function(item, i){
        services.push(new service(item));
      });

      return services;
    }

    function MapLocationServices(services){
      var locations = [];

      for(var i = 0; i< services[0].locations.length;i++){

        var loc = new location(services[0].locations[i]);

        for(var j=0;j< services.length;j++ ){

          var svc = new service(services[j]);

          for(var k=0;k< services[j].locations.length;k++ ){
            if( services[j].locations[k].code == loc.code.toUpperCase()){
              svc.enabled = services[j].locations[k].enabled;
              svc.status = services[j].locations[k].status;
            }
          }
          loc.services.push(svc);
        }
        locations.push(loc);
      }
      return locations;
    }

    function MapSuccessCount(location){
      var statusCount = {}
      statusCount.count = 0
      statusCount.maintance = false;
      statusCount.warning = false;
      statusCount.error = false;

      for(var i = 0;i< location.length;i++){

        var hasErrors = false
        for(var j =0;j< location[i].services.length;j++){
          if(location[i].services[j].status != "OK" || location[i].services[j].enabled != true ){
            hasErrors = true;
          }

        }

        for(var j =0;j< location[i].services.length;j++){
          if(location[i].services[j].status == "ERR" ){
            statusCount.error = true;
          }
        }

        for(var j =0;j< location[i].services.length;j++){
          if(location[i].services[j].status == "MNT" ){
            statusCount.maintance = true;
          }
        }

        for(var j =0;j< location[i].services.length;j++){
          if(location[i].services[j].status == "DGR" ){
            statusCount.warning = true;
          }
        }

        if(!hasErrors) {statusCount.count ++};

      }
      return statusCount;

    }

    function MapClassName(data){
      if(data == "DELIVER"){
        return "cdn";
      }
      else if(data == "DEFEND"){
        return "shield";
      }
      else if(data == "TRANSACT"){
        return "transact";
      }
      else if(data == "ACCELERATE"){
        return "gauge";
      }
      else if(data == "STORE"){
        return "store";
      }
      else if(data == "ROUTE"){
        return "route";
      }
    }


    return model
  }

}());


