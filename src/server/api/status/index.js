/**
 * Using standard naming convention for endpoints.
 * GET     /status             ->  Get Status Report
 * POST    /status             ->  Create New Status Report
 * GET     /status/:id         ->  ?????
 */

'use strict';
var express = require('express');
var router = express.Router();
var config = require('../../config/environment');
var auth = require('../../components/auth/lib/auth.service.js');
var statusService = require('../../components/statusService');

router.get('/', function(req, res) {
  statusService.setup(config);

  statusService.report(function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result.report);
  });
});

router.post('/',auth.APIAuthentication(), function(req, res) {
  statusService.setup(config);
  var report = req.body;

  statusService.createReport(report, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

router.post('/news', function(req, res) {
  statusService.setup(config);
  var news = req.body;

  statusService.createNews(news, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

router.get('/news', function(req, res) {
  statusService.setup(config);

  statusService.getNews(function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});



module.exports = router;
