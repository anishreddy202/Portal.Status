(function(){
  'use strict';

  angular
    .module('uiApp.admin')
    .factory('AdminDTOModel', AdminDTOModel);

  AdminDTOModel.$inject = [];

  function AdminDTOModel(){

    var model = {
      network: network
    };

    function network(data){
      var self = this;
      this.code = data.code;
      this.name = data.name.toUpperCase();
      this.systems = data.systems;
      this.services = MapNetworkServicesDTO(data.services, data.locations);
      return self;

    }

    function service(data,locations){
      var self = this;
      this.name = data.name.toUpperCase();
      this.code = data.code;
      this.locations = MapNetworkLocationsDTO(locations,data.code);
      return self;
    }

    function location(data){
      var self = this;
      this.name = data.name.toUpperCase();
      this.code = data.code.toUpperCase();
      this.region = data.region.toUpperCase();
      this.status = null;
      this.enabled = null;
      this.isSelected = false;
      return self;
    }

    /****private functions *****/

    function MapNetworkServicesDTO(data, locations){
      var services = [];

      angular.forEach(data, function(item, i){
        services.push(new service(item,locations));
      });

      return services;
    }

    function MapNetworkLocationsDTO(data,code){

      var locations = [];

      angular.forEach(data, function(item, i){
        var loc = new location(item);

        angular.forEach(item.services, function(data, i){
          if(data.code == code){
            loc.status = data.status;
            loc.enabled = data.enabled;
            loc.isSelected = data.isSelected;
          }
        });

        locations.push(loc);
      });

      return locations;
    }

    return model
  }

}());


