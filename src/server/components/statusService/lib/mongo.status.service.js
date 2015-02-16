'use strict';
var db = require("mongoDAL");
var Verror = require("verror");

var StatusService = function(config){
  var self = this;
  var config = config.mongo;
  var report;

  self.report = function(done){

    db.connect(config, function(err, db) {
      if(err) {
        if(!report) getDefaultReport();

        return done(null, report);
      }

      db.collectionExists("status", function(err, exists) {
        if(err || !exists) {
          if(!report) getDefaultReport();

          return done(null, report);
        }

        db.status.first({}, function(err, result) {
          if(err || result === null) {
            if(!report) getDefaultReport();

            return done(null, report);
          }

            return done(null, result);
        });
      });

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
