(function() {
  'use strict';

  angular
    .module('app.ui')
    .directive('slimScroll', slimScroll);

    function slimScroll() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.slimScroll({
            height: attrs.scrollHeight || '100%'
          });
        }
      };
    }

}());
