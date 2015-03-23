'use strict';
var db = require("mongoDAL");
var Verror = require("verror");
var Validator = require('../lib/validator');
var Emitter = require('events').EventEmitter;
var util = require('util');

var StatusService = function(configuration){
  var self = this;
  var continueWith = null;
  var config = configuration.mongo;
  var report;


  var defaultReport = function() {
    try {
      if(!report)
        report = JSON.parse(require('fs').readFileSync(__dirname + '/files/defaultReport.json', 'utf8'));

      self.emit('send-data', report);
    } catch (err) {
      self.emit('send-error', err, 'Bad default json file');
    }
  };

  var statusReport = function() {
     db.status.last({}, function(err, result) {
       if(err === null && result === undefined) {
         self.emit('default-report');
       } else {
         self.emit('send-data', result);
       }
     });
  };

  var validateInput = function(data){
    var validator = new Validator();
    validator.validate(data.report, function(err, result){
      if(err) {
        self.emit('send-error', err,'Invalid Report');
      } else {
        self.emit('save-report', data);
      }
    });
  };

  var saveReport = function(data){
    db.status.saveData(data, function(err, result) {
      if(err) {
        self.emit('send-error', err, 'Failed to Save Report');
      }
      else {
        self.emit('send-data', result.report);
      }
    });
  };

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

  var collectionExits = function(data){
     db.collectionExists(data, function(err, exists) {
       if (err || !exists) {
         self.emit('default-report');
       }
       else{
         self.emit('status-report');
       }
     });
  }

  var openConnection = function(input,eventHandler) {
    db.connect(config, function(err) {
      if(err) {
        self.emit('collection-exits','status');
      } else {
        self.emit(eventHandler, input);
      }
    });
  };

  ////////////////////////////////////////////////////

  self.report = function(done){
    continueWith = done;
    openConnection(null,'status-report');
  };

  self.createReport = function(report,done){
    var newReport = {};
    newReport.report = report;
    newReport.timeStamp = new Date()

    continueWith = done;
    openConnection(newReport, 'validate-input');
  };

  self.on('default-report', defaultReport);
  self.on('status-report', statusReport);
  self.on('validate-input', validateInput);
  self.on('save-report', saveReport);
  self.on('collection-exits',collectionExits);
  self.on('send-data',sendData);
  self.on('send-error',sendError);

  return self;
};

util.inherits(StatusService,Emitter);
module.exports = StatusService;
