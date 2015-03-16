(function(){
  'use strict';

  angular
    .module('uiApp.admin')
    .factory('AdminDTOModel', AdminDTOModel);

  AdminDTOModel.$inject = [];

  function AdminDTOModel(){

    var model = {
      network: Network
    };

    function Network(data){
      var self;
      self.code = data.code;
      self.name = data.name.toUpperCase();
      self.systems = data.systems;
      self.services = mapNetworkServicesDTO(data.services, data.locations);
      return self;

    }

    function Service(data,locations){
      var self;
      self.name = data.name.toUpperCase();
      self.code = data.code;
      self.locations = mapNetworkLocationsDTO(locations,data.code);
      return self;
    }

    function Location(data){
      var self;
      self.name = data.name.toUpperCase();
      self.code = data.code.toUpperCase();
      self.region = data.region.toUpperCase();
      self.status = null;
      self.enabled = null;
      self.isSelected = false;
      return self;
    }

    /****private functions *****/

    function mapNetworkServicesDTO(data, locations){
      var services = [];

      angular.forEach(data, function(item, i){
        services.push(new Service(item,locations));
      });

      return services;
    }

    function mapNetworkLocationsDTO(data,code){

      var locations = [];

      angular.forEach(data, function(item, i){
        var loc = new Location(item);

        angular.forEach(item.services, function(data, i){
          if(data.code === code){
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


