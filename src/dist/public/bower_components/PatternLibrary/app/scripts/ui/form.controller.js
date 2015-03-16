(function() {
  'use strict';

  angular
    .module('app.ui.form')
    .controller('FormValidationCtrl', FormValidationCtrl);

  FormValidationCtrl.$inject = ['$log'];

  function FormValidationCtrl(log) {
    /* jshint validthis: true */
    var vm = this;

    vm.model = {
      name: '',
      username: 'johndoe',
      email: '',
      password: '',
      pwdConfirm: ''
    };


    vm.cancel = cancel;
    vm.submitForm = submitForm;

    ////////////////////////

    var original = angular.copy(vm.model);

    function cancel() {
      log.info('Cancel Form');
      vm.model = angular.copy(original);
      vm.form.$setPristine();
    }

    function submitForm(isValid) {
      if(isValid) {
        log.info('Submit Form');
      }
    }
  }

}());
