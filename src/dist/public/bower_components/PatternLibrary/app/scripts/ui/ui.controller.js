(function() {
  'use strict';

  angular
    .module('app.ui')
    .controller('ModalDemoCtrl', ModalDemoController)
    .controller('ModalInstanceCtrl', ModalInstanceController);

  ModalDemoController.$inject = ['$modal', '$log'];
  ModalInstanceController.$inject = ['$modalInstance', 'items'];


  function ModalDemoController(modal, log) {
    /* jshint validthis: true */
    var vm = this;

    vm.items = ['item1', 'item2', 'item3'];
    vm.open = open;

    ///////////////////

    function open() {
      log.info('Modal opened at: ' + new Date());

      var modalInstance = modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl as modal',
        resolve: {
          items: function() {
            return vm.items;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        vm.selected = selectedItem;
      }, function() {
        log.info('Modal dismissed at: ' + new Date());
      });
    }
  }

  function ModalInstanceController(modalInstance, items) {
    /* jshint validthis: true */
    var vm = this;

    vm.items = items;
    vm.selected = {
      item: vm.items[0]
    };
    vm.ok = ok;
    vm.cancel = cancel;

    ///////////////////

    function ok() {
      modalInstance.close(vm.selected.item);
    }

    function cancel() {
      modalInstance.dismiss('cancel');
    }
  }

}());


