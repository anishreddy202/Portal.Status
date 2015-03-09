'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service.js');

var router = express.Router();

router.post('/', function(req, res, next) {
  console.log("i am in index");
  passport.authenticate('local', function (err, user, info) {
    console.log(err);
    console.log(info);
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Invalid Login.'});
    var token = auth.signToken(user.id, user.email);
    //res.cookie('token', JSON.stringify(token));
    //res.redirect('/');
    res.json({token: token});


  })(req, res, next)
});

module.exports = router;
