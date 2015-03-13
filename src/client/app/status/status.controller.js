(function(){
  'use strict';

  angular
    .module('uiApp.status')
    .controller('StatusCtrl', StatusFn);


  StatusFn.$inject = ['StatusService','StatusModel','NewsService','$anchorScroll', '$location'];

  function StatusFn(StatusService,StatusModel,NewsService,$anchorScroll, $location) {

    var self = this;

    self.network= [];
    self.networkModel = [];
    self.selectedNetwork;
    self.News =[];

    self.selectNetwork = selectNetwork;
    self.gotoNews = gotoNews;

    init();

    function init(){
      getStatus();
      getNews();
    }

    function getStatus(){
      StatusService.getStatus()
        .then(function(response) {
          MapNetworkStatus(response.data);
          self.selectedNetwork = self.network[0];
        })
        .catch();
    }

    function getNews(){
      NewsService.getNews()
        .then(function(response) {
          self.news = response.data;
        })
        .catch();
    }

    function gotoNews(){
      var newHash = 'news';
      if ($location.hash() !== newHash) {
        $location.hash('news');
      } else {
        $anchorScroll();
      }
    }

    function selectNetwork(network){
      self.selectedNetwork = network;
      console.log(self.selectedNetwork);
    }

    /**private functions **/

    function MapNetworkStatus(data){
      for(var i = 0; i< data.length;i++){
        var network = new StatusModel.network(data[i]);
        self.network.push(network);
      }
    }

  }

})();


