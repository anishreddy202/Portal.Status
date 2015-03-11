'use strict';
var db = require("mongoDAL");

var NewsService = function(configuration){
  var self = this;
  var config = configuration.mongo;

  self.createNews = function(news,done){
    db.news.saveData(news, function(err, result) {
      if(err) {
        return done(err, null);
      }

      return done(null, result);
    });

  };

  self.getNews = function(done){
    db.news.query({}, function(err, result) {
      if(err) {
        return done(err, null);
      }

      return done(null, result);
    });

  };

  return self;
};

module.exports = NewsService;
