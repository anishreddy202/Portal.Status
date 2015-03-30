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

  self.getNews = function(params,done) {
    service.getNews(params,function(err, result) {
      done(err, result);
    });
  };

  self.getFeed = function(params,done) {
    service.getFeed(params,function(err, result) {
      done(err, result);
    });
  };

  return self;
};

module.exports = new NewsService();
