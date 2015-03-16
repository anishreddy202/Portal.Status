/* jshint -W024 */
/* jshint expr:true */
'use strict';

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var _ = require('lodash');
var app = require('../../../app');
var api = request(app);

describe('*** CR /api/v1/new ***', function() {
  it('Retrieves News', function(done){
    api.get('/api/v1/status/')
      .expect(200)
      .end(function (err, res) {
        assert.ok(err === null, err);
        var result = res.body;
        result.should.not.be.equal(null);
        result.should.be.instanceof(Array);
        done();
      });
  });
});
