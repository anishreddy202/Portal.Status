(function(){
  'use strict';

  angular
    .module('uiApp')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$location','authService'];

  function HeaderCtrl ($location, authService) {
    var self = this;

    self.isCollapsed = true;
    self.isLoggedIn = authService.isLoggedIn;
    self.getCurrentUser = authService.getCurrentUser;

    self.logout = logout;
    self.isActive = isActive;
    self.sideNavToggle = sideNavToggle;

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
  }

})();
