(function(){
  'use strict';

  angular
    .module('uiApp.news')
    .controller('NewsCtrl', NewsFn);

  NewsFn.$inject = ['NewsService','$modal','StatusService',];

  function NewsFn (NewsService,modal,StatusService) {
    var self = this;
    self.news=[];
    self.searchText;

    self.open = open;
    self.addNews = addNews;
    self.removeNews = removeNews;

    var products = [];
    var locations = [];

    init();

    function init(){
      NewsService.getNews()
        .then(function(response) {
          self.news = response.data;
        })
        .catch();

      StatusService.getStatus()
        .then(function(response) {
          products = response.data;
          locations = response.data[0].services[0].locations;
        })
        .catch();
    }

    function addNews() {
      self.open();
    }

    function saveNews(news){
      NewsService.createNews(news)
        .then(function(response) {
              init();
        })
        .catch();
    }

    function removeNews(news){
      console.log(news);
      NewsService.deleteNews(news)
        .then(function(response) {
          init();
        })
        .catch();
    }

    function open() {
      var modalInstance = modal.open({
        templateUrl: 'app/news/news-modal.html',
        controller: function(){
          this.cancel = function(){
            modalInstance.dismiss('cancel');
          };
          this.products = products;
          this.services = [];
          this.locations=[];
          this.comment = "";
          this.selectedProduct = {"name":"Select Product"};
          this.selectedService = {"name":"Select Service"};
          this.selectedLocation = {"name":"Select POP"};
          this.selectProduct = function(data){
              this.selectedProduct = data;
              this.services = data.services
          };
          this.selectService = function(data){
            this.selectedService = data;
            this.locations = data.locations
          };
          this.selectLocation = function(data){
            this.selectedLocation = data;
          };
          this.save = function(){
            var news ={};
            news.product = this.selectedProduct
            news.services = this.selectedService;
            news.comment = this.comment;
            news.locations = this.selectedLocation;

            saveNews(news)
            modalInstance.dismiss('cancel');
          };
        },
        controllerAs: 'vm'
      });
    }

  }

})();


