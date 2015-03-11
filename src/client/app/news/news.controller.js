(function(){
  'use strict';

  angular
    .module('uiApp.news')
    .controller('NewsCtrl', NewsFn);

  NewsFn.$inject = ['NewsService'];

  function NewsFn (NewsService) {
    var self = this;
    self.news=[];
    self.searchText;

    init();

    function init(){
      NewsService.getNews()
        .then(function(response) {
          console.log(response);
          self.news = response.data;
          console.log(self.news);
        })
        .catch();
    }

  }

})();


