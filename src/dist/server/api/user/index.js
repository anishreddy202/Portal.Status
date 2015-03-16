/**
 * Using standard naming convention for endpoints.
 * GET     /users              ->  list
 * POST    /users              ->  create
 * GET     /users/:id          ->  read
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  delete
 */

'use strict';
var express = require('express');
var router = express.Router();
var config = require('../../config/environment');
var auth = require('../../components/auth/lib/auth.service.js');
var userService = require('../../components/userService');


router.get('/', function(req, res) {
  userService.setup(config);
  var params = req.query;

  userService.list(params,function(err, result) {
    if(err) {
      res.send(err);
    }
    res.json(result);
  });
});


router.post('/', function(req, res) {
  userService.setup(config);
  var user = req.body;

  userService.create(user, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});


router.get('/me', auth.isAuthenticated(), function(req, res) {
  userService.setup(config);

  var filter ={'id':req.user.id};
  userService.read(filter, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

router.get('/:id', function(req, res) {
  userService.setup(config);
  var params = req.params;

  userService.read(params, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});



router.put('/:id', function(req, res) {
  userService.setup(config);
  var user = req.body;
  user.id = req.params.id;

  userService.update(user, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});


router.delete('/:id', function(req, res) {
  userService.setup(config);
  var params = req.params;

  userService.delete(params, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});


router.get('/search/:id', function(req, res) {
  userService.setup(config);
  var params = req.params;

  userService.search(params, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

module.exports = router;
