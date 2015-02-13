'use strict';

var assert = require('assert');

var StatusService = function(config){
  var self = this;

  self.report = function(done){
    var result = require('./files/defaultReport.json');
    var err = null;  //Prep Error assuming that we are talking to DB later
    done(err, result);
  }

  return self;
};

module.exports = StatusService;
