'use strict';

var MockService = require('./lib/mock.status.service');
var MongoService = require('./lib/mongo.status.service');

var StatusService = function() {
  var self = this;
  var service = null;

  self.setup = function(config) {
    console.log(config)
    if(config.mock && config.mock === true) {
      console.log("starting mock")
            service = new MockService(config);
    } else {
      console.log("starting mongo")
      service = new MongoService(config);
    }
  };

  self.report = function(done) {
    console.log("report ")
    service.report(function(err, result) {
      done(err, result);
    });
  };

  return self;
};

module.exports = new StatusService();
