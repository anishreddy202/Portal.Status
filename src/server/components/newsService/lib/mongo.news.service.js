'use strict';
var db = require("mongoDAL");
var Verror = require("verror");
var Emitter = require('events').EventEmitter;
var util = require('util');
var objectID=require('mongodb').ObjectID;

var NewsService = function(configuration){
  var self = this;
  var config = configuration.mongo;
  var continueWith = null;


  var sendData = function(result) {
    if(continueWith) {
      continueWith(null, result);
    }
  };

  var sendError = function(err, message) {

    var error = new Verror(err, message);

    if(continueWith) {
      continueWith(null, error);
    }
  };

  var getNews = function(params) {
    var filter = {
      query: {},
      limit: parseInt(params.pageSize) || 10,
      skip: (params.pageSize) * parseInt(params.pageIndex) || 0
    };

    if(params.filter === '48') {
      var date = new Date().getTime() - (60 * 60 * 48 * 1000);
      filter.query = {
        dateTime: {
          $gt: new Date(date).toISOString()
        }
      }
    }

    var list = {
      currentPage: 0,
      count: 0,
      news: []
    };

    db.news.length(function(err, length){
      db.news.paginationQuery(filter, function(err, result) {
        if(err) {
          self.emit('send-error', err, 'Failed to retrieve news');
        } else {
          list.news = result;
          list.count = length;
          list.currentPage = parseInt(params.pageIndex);
          self.emit('send-data', list);
        }
      });
   });

  };

  var createNews = function(news) {
    db.news.saveData(news, function(err, result) {
      if(err) {
        self.emit('send-error', err, 'Failed to save news');
      } else {
        self.emit('send-data', result);
      }
    });
  };

  var deleteNews = function(params) {
    db.news.destroy(params.id, function(err, result) {
      if(err) {
        self.emit('send-error', err, 'Failed to delete news');
      } else {
        self.emit('send-data', result);
      }
    });
  };

  var openConnection = function(input,eventHandler) {
    db.connect(config, function(err) {
      if(err) {
        self.emit('send-error', err, 'Failed to Connect Mongo Database');
      } else {
        self.emit(eventHandler, input);
      }
    });
  };

  self.getNews = function(params,done){
    continueWith = done;
    openConnection(params,'get-news');
  };

  self.createNews = function(news,done){
    continueWith = done;
    openConnection(news,'create-news');
  };

  self.deleteNews = function(params,done){
    continueWith = done;
    openConnection(params,'delete-news');
  };


  self.on('get-news', getNews);
  self.on('create-news', createNews);
  self.on('delete-news', deleteNews);
  self.on('send-data',sendData);
  self.on('send-error',sendError);

  return self;
};

util.inherits(NewsService,Emitter);
module.exports = NewsService;
