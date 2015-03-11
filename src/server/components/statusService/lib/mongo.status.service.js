'use strict';
var db = require("mongoDAL");
var Verror = require("verror");
var Validator = require('../lib/validator');

var StatusService = function(configuration){
  var self = this;
  var config = configuration.mongo;
  var report;

  self.report = function(done){

      //getDefaultReport();
      //return done(null, report);

    db.connect(config, function(err, db) {
       if(err) {
         if(!report) {
           getDefaultReport();
         }

         return done(null, report);
       }

       db.collectionExists("status", function(err, exists) {
         if(err || !exists) {
           if(!report) {
             getDefaultReport();
           }

           return done(null, report);
         }

         db.status.last({}, function(err, result) {
           if(err === null && result === undefined) {
             if(!report) {
               getDefaultReport();
             }
             return done(null, report);
           }
           return done(null, result);
         });
       });

    });
  };

  self.createReport = function(report,done){

    var obj = {};
    obj.report = report;
    obj.timeStamp = new Date();

            db.status.saveData(obj, function(err, result) {
              if(err) {
                return done(err, null);
              }

              return done(null, result.report);
            });

    //var validator = new Validator();
    //validator.validate(data.report, function(err, result){
    //    if(err){
    //      return done(err, null);
    //    }
    //
    //    db.connect(config, function(err, db) {
    //      if(err) {
    //        return done(err, null);
    //      }
    //
    //      db.collectionExists("status", function(err, exists) {
    //        if(err || !exists) {
    //          return done(err, null);
    //        }
    //
    //        db.status.saveData(result, function(err, result) {
    //          if(err) {
    //            return done(err, null);
    //          }
    //
    //          return done(null, result);
    //        });
    //      });
    //
    //    });
    //});
  };

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


  var getDefaultReport = function() {
    try {
      report = JSON.parse(require('fs').readFileSync(__dirname + '/files/defaultReport.json', 'utf8'));
    } catch (err) {
      throw new Verror(err, 'Bad default json file');
    }
  }

  return self;
};

module.exports = StatusService;
