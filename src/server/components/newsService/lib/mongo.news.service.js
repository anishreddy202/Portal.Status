'use strict';
var db = require("mongoDAL");

var NewsService = function(configuration){
  var self = this;
  var config = configuration.mongo;

  self.createNews = function(news,done){
    db.connect(config, function(err, db) {
      db.news.saveData(news, function (err, result) {
        if (err) {
          return done(err, null);
        }
        return done(null, result);
      });
    });

  };

  self.getNews = function(done){
    db.connect(config, function(err, db) {
      db.news.query({}, function (err, result) {
        if (err) {
          return done(err, null);
        }

        return done(null, result);
      });
    });
  };

  self.deleteNews = function(params,done){
    db.connect(config, function(err, db) {
      db.news.destroy(params.id, function (err, result) {
        if (err === null && result === 'false') {
          err = "delete Failed";
        }
        done(err, result);
      });
    });

  };

  return self;
};

module.exports = NewsService;
