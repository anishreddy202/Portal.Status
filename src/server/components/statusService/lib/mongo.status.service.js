'use strict';

var db = require("../../mongoDAL");
var assert = require('assert');

var StatusService = function(config){
  var self = this;

  self.report = function(done){
  	 db.connect(config.mongo, function (err, db) {
      db.status.first( {}, function (err, result) {
      	console.log(result)
        // assert.ok(err === null, err);
        // var mappedUser = null;

        // if (result) {
        //   mappedUser = new User(result);
        // }
        done(err, result);
      });
    });

  	console.log("inside mongo, report")
    // var result = [] //require('./files/defaultReport.json');
    // var err = null;  //Prep Error assuming that we are talking to DB later
    // done(err, result);
  }

  return self;
};

module.exports = StatusService;
