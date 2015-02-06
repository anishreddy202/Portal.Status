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


module.exports = router;
