var events = require("events");
var assert = require("assert");
var util = require("util");


var AuthResult = function(creds){
  var result = {
    creds: creds,
    success : false,
    message : "Invalid User",
    user : null,
    log : null
  };

  return result;

};

var Authentication = function(userService, db) {
  var self = this;
  var continueWith = null;
  var service = userService;

  // validate credentials
  var validateCredentials = function(authResult){
    if(authResult.creds.userLogin && authResult.creds.password) {
      self.emit("creds-ok", authResult);
    }else{
      self.emit("invalid", authResult);
    }
  };

  // find the user
  var getUser = function(authResult){
    var params = { userName: authResult.creds.userLogin, password :authResult.creds.password };
    userService.read(params, function(err, user){
      if(user){
        authResult.user = user;
        self.emit("user-found", authResult);
      } else {

        self.emit("invalid", authResult);
      }
    });
  };

  // Log Success
  var logSuccess = function(authResult){
    //var log = new Log({subject: "Authentication",
    //  userId : authResult.user.userName,
    //  entry: "Login Success"});
    //
    //db.logs.save(log, function(err, newLog){
    //  authResult.log = newLog;
    //  self.emit("log-success", authResult);
    //});
    self.emit("log-success", authResult);
  };

  //Log Failure
  var logFailure = function(authResult){
    //if(authResult.creds.userLogin === null || authResult.creds.userLogin === ''){
    //  authResult.creds.userLogin = 'null';
    //}
    //
    //var log = new Log({subject: "Authentication",
    //  userId : authResult.creds.userLogin,
    //  entry: "Login Failure"});
    //
    //db.logs.save(log, function(err, newLog){
    //  authResult.log = newLog;
    //  self.emit("log-failure", authResult);
    //});
    self.emit("log-failure", authResult);
  };

  var authOk = function(authResult){
    authResult.success = true;
    authResult.message = "Valid Login";
    self.emit("authenticated", authResult);
    if(continueWith){
      continueWith(null, authResult);
    }
  };

  var authNotOk = function(authResult){
    authResult.success = false;
    authResult.message = "Invalid Login";
    self.emit("not-authenticated", authResult);
    self.emit("completed", authResult);
    if(continueWith){
      continueWith(null, authResult);
    }
  }


  // Happy Path
  self.on("login-received", validateCredentials);
  self.on("creds-ok", getUser);
  self.on("user-found", logSuccess);
  self.on("log-success", authOk);

  // Sad Path
  self.on("invalid", logFailure);
  self.on("log-failure", authNotOk);

  self.authenticate = function(creds, next) {
    continueWith = next;
    var authResult = new AuthResult(creds);

    self.emit("login-received", authResult);
  };

};


util.inherits(Authentication, events.EventEmitter);
module.exports = Authentication;

