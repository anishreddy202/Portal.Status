(function(){
  'use strict';

  angular
    .module('uiApp.news')
    .controller('NewsCtrl', NewsFn);

  NewsFn.$inject = ['NewsService','$modal','StatusService',];

  function NewsFn (NewsService,modal,StatusService) {
    var self = this;
    self.news=[];
    self.searchText = '';

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
          locations = mapLocations(response.data[0].services[0].locations);
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

    function mapLocations(data){
      var locs = []
      for(var i=0;i<data.length;i++){
        var loc = {};
        loc.name = data[i].name;
        loc.code = data[i].code;
        locs.push(loc);
      }
      return locs
    }

    function mapServices(data){
      var servs = []
      for(var i=0;i<data.length;i++){
        var serv = {};
        serv.name = data[i].name;
        serv.code = data[i].code;
        servs.push(serv);
      }
      return servs;
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
          this.locations= locations;
          this.comment = '';
          this.selectedProduct = {'name':'Select Product'};
          this.selectedService = [];
          this.selectedLocation = [];
          this.selectProduct = function(data){
              this.selectedProduct = {'name': data.name,'code':data.code};
              this.services = mapServices(data.services);
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


