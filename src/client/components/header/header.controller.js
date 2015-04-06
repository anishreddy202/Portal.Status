(function(){
  'use strict';

  angular
    .module('uiApp')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$location','authService','$modal'];

  function HeaderCtrl ($location, authService,modal) {
    var self = this;

    self.isCollapsed = true;
    self.isLoggedIn = authService.isLoggedIn;
    self.getCurrentUser = authService.getCurrentUser;
    self.logout = logout;
    self.isActive = isActive;
    self.sideNavToggle = sideNavToggle;
    self.updateStatus = updateStatus;

    function logout() {
      if(self.isCollapsed){
        authService.logout();
        $location.path('/login');
      }else {
        authService.logout();
        $location.path('/login');
        $('#wrapper').toggleClass('sidebar-toggle');
      }
    }

    function isActive(route) {
      return route === $location.path();
    }

    function sideNavToggle() {
      if(self.isCollapsed){
        self.isCollapsed = false;
      }
      else{
        self.isCollapsed = true;
      }

      $('#wrapper').toggleClass('sidebar-toggle');
    }

    function updateStatus(){
      self.open();
    }

    function open() {
      var modalInstance = modal.open({
        templateUrl: 'components/header/status-modal.html'
      });
    }
  }

})();
