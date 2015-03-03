
var mockAuthenticationService = require('./lib/authentication.service');
var assert = require('assert');

var AuthenticationService = function() {
  var self = this;
  var service = null;
  var db = null
  var config = null;

  self.setup = function (configuration){
    db = require("mongoDAL");
    config = configuration;
    var userService = require('../userService');
    userService.setup(config);

    if(config.mock && config.mock === 'true') {
      service = new mockAuthenticationService(userService,db);
    } else {
      service = new mockAuthenticationService(userService,db);
    }
  };

  self.authenticate = function(credentials, done){

    if (config.mock && config.mock === 'false') {
      service.authenticate(credentials, function(err, result) {
        return done(null, result);
      })
    }else {
      db.connect(config.mongo, function (err, db) {
        service.authenticate(credentials, function (err, result) {
          if (err) return done(err);
          if (!result.user) {
            return done(null, result, {message: result.message});
          }
          return done(null, result);
        });
      });
    }
  };

  return self;
}

module.exports = new AuthenticationService();
