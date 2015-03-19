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
var newsService = require('../../components/newsService');

router.get('/', function(req, res) {
  newsService.setup(config);
  var params = req.query;
  console.log(params);
  newsService.getNews(params,function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

router.post('/', function(req, res) {
  newsService.setup(config);
  var report = req.body;

  newsService.createNews(report, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

router.delete('/:id', function(req, res) {
  newsService.setup(config);
  var params = req.params;
  newsService.deleteNews(params, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
});

module.exports = router;
