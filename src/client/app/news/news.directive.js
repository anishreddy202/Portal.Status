(function () {
  'use strict';

  angular
    .module('uiApp.news')
    .directive('dropdownMultiselect', function(){
    return {
      restrict: 'E',
      scope:{
        model: '=',
        options: '=',
        pre_selected: '=preSelected'
      },
      templateUrl:'app/admin/dropdown-Multiselect.html',
      controller: function($scope){

        $scope.openDropdown = function(){
          $scope.selected_items = [];
        };

        $scope.selectAll = function () {
          $scope.model = $scope.options;
          console.log($scope.model);
        };
        $scope.deselectAll = function() {
          $scope.model=[];
          console.log($scope.model);
        };
        $scope.setSelectedItem = function(){
          var item = this.option
          if (_.contains($scope.model, item)) {
            $scope.model = _.without($scope.model, item);
          } else {
            $scope.model.push(item);
          }
          console.log($scope.model);
          return false;
        };
        $scope.isChecked = function (item) {
          if (_.contains($scope.model, item)) {
            return 'icon-check-circle pull-left';
          }
          return false;
        };
      }
    }
  });

})();
