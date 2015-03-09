'use strict';

var passport = require('passport');
var config = require('../../../config/environment/index');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../../userService');
var validateJwt = expressJwt({ secret: config.secrets.session });

var AuthService = function(){

  var self = this;

  self.setTokenCookie = function(req, res) {
    if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
    var token = jwt.sign({ id: req.user.id, email: req.user.email }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
  };

  self.signToken = function(id, email) {
    return jwt.sign({id: id, email: email}, config.secrets.session, {expiresInMinutes: 60*5});
  };

  self.isAuthenticated = function(){
    return compose()
      .use(function(req,res,next){
        if(req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        validateJwt(req, res, next);
      })
      .use(function(req,res,next){
        User.setup(config);
        User.read({'id': req.user.id}, function(err, user) {
          if (err) return next(err);
          if (!user) return res.send(401);
          req.user = user;
          next();
        });
      })
  }

  return self;
}
module.exports = new AuthService();

