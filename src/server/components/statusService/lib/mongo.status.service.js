'use strict';
var db = require("../../mongoDAL");
var assert = require('assert');

var StatusService = function(config){
  var self = this;
  var defaultReport = './files/defaultReport.json';

  self.report = function(done){
  	 db.connect(config.mongo, function (err, db) {
      db.collectionExists("status", function(err, exists){
        if(exists) {
          db.status.first( {}, function (err, result) {
            done(err, result);
          });

        } else {
          getDefaultReport(function(err, result){
            done(err, result);
          });
        }
      });
    });
  }

  var getDefaultReport = function(done){
    try {
      done(null, require(defaultReport));
    } catch(err) {
      done(err);
      //TODO: Add Verror here and wrap the error.
    }
  };

  return self;
};

module.exports = StatusService;
