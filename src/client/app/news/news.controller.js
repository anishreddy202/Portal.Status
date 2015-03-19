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
    self.module= 'news';
    self.pageSize = 1;
    self.currentPage = 0;
    self.count = 0;

    self.open = open;
    self.addNews = addNews;
    self.removeNews = removeNews;
    self.nextPage = nextPage;

    var products = [];
    var locations = [];

    init();

    function init(){
      var params = {};
      params.filter = null;
      params.pageSize = self.pageSize;
      params.currentPage = self.currentPage;

      NewsService.getNews(params)
        .then(function(response) {
          console.log(response.data)
          angular.forEach(response.data.news, function(item){
            self.news.push(item);
          });

          self.count = response.data.count;
          self.currentPage = response.data.currentPage;
        })
        .catch();

      StatusService.getStatus()
        .then(function(response) {
          products = response.data;
          locations = mapLocations(response.data[0].services[0].locations);
        })
        .catch();
    }

    function nextPage(){
      self.currentPage++;
      init();
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
            news.module = 'news';
            news.locations = this.selectedLocation;
            news.dateTime = new Date();

            saveNews(news)
            modalInstance.dismiss('cancel');
          };
        },
        controllerAs: 'vm'
      });
    }

  }

})();


