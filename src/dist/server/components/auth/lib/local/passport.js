var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var PassportService = function(){
  var self = this;

  self.setup = function (authenticateService,config) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
      },
      function(email, password, done) {
        var credentials = {'userLogin': email, 'password': password};
        authenticateService.setup(config);
        authenticateService.authenticate(credentials, function(err, result) {
          done(null, result.user);
        })
      }
    ));
  };

  return self;
};

module.exports = new PassportService();

