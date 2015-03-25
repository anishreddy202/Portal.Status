'use strict';

var express = require('express');
var config = require('../../config/environment');
var User = require('UserService.lib');
var authentication = require('../authentication')

// Passport Configuration
require('./lib/local/passport').setup(authentication, config);


var router = express.Router();

router.use('/local', require('./lib/local/index'));

module.exports = router;
