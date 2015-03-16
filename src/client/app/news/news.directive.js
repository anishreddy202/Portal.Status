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
      template: "<div class='btn-group' data-ng-class='{open: open}'>"+
      "<button class='btn btn-primary'>" +
      " <span ng-if='model.length != 0' >{{model.length }} Selected</span><span ng-if='model.length == 0'>Select</span></button>"+
      "<button class='btn btn-primary dropdown-toggle' data-ng-click='open=!open;openDropdown()'><span class='caret'></span></button>"+
      "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
      "<li><a data-ng-click='selectAll()'><i class='icon-ok-sign'></i>  Check All</a></li>" +
      "<li><a data-ng-click='deselectAll();'><i class='icon-remove-sign'></i>  Uncheck All</a></li>" +
      "<li class='divider'></li>" +
      "<li data-ng-repeat='option in options'> <a data-ng-click='setSelectedItem()'>{{option.name}}<span data-ng-class='isChecked(option)'></span></a></li>" +
      "</ul>" +
      "</div>" ,
      controller: function($scope){

        $scope.openDropdown = function(){
          $scope.selected_items = [];
          //for(var i=0; i<$scope.pre_selected.length; i++){
          //  $scope.selected_items.push($scope.pre_selected[i].code);
          //}
        };

        $scope.selectAll = function () {
          //$scope.model = _.pluck($scope.options, 'code');
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
