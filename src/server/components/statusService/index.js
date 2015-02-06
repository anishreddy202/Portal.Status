'use strict';

var MongoService = require('./lib/mongo.status.service');

var StatusService = function() {
  var self = this;
  var service = null;

  self.setup = function(config) {
    service = new MongoService(config);
  };

  self.report = function(done) {
    service.report(function(err, result) {
      done(err, result);
    });
  };

  return self;
};

module.exports = new StatusService();