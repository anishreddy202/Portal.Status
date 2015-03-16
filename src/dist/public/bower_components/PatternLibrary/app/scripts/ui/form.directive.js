(function() {
  'use strict';

  angular
    .module('app.ui.form')
    .directive('passwordVerify', passwordVerify);

  function passwordVerify() {
    var directive = {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: link
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      scope.$watch(function() {
        var combined;

        if (scope.passwordVerify || ctrl.$viewValue) {
          combined = scope.passwordVerify + '_' + ctrl.$viewValue;
        }
        return combined;
      }, function(value) {
        if (value) {
          ctrl.$parsers.unshift(function(viewValue) {
            var origin = scope.passwordVerify;
            if (origin !== viewValue) {
              ctrl.$setValidity('passwordVerify', false);
              return undefined;
            } else {
              ctrl.$setValidity('passwordVerify', true);
              return viewValue;
            }
          });
        }
      });
    }

  }
}());
