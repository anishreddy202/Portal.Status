'use strict';

var MongoNewsService = require('./lib/mongo.news.service');

var NewsService = function() {
  var self = this;
  var service = null;

  self.setup = function(config) {
    service = new MongoNewsService(config);
  };

  self.createNews = function(news,done) {
    service.createNews(news,function(err, result) {
      done(err, result);
    });
  };

  self.deleteNews = function(params,done) {
    service.deleteNews(params,function(err, result) {
      done(err, result);
    });
  };

  self.getNews = function(done) {
    service.getNews(function(err, result) {
      done(err, result);
    });
  };

  return self;
};

module.exports = new NewsService();
