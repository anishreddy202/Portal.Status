/* jshint -W024 */
/* jshint expr:true */
'use strict';

var should = require('should');
var assert = require('assert');
var StatusService = require('../lib/mongo.status.service');

describe("Status Data", function(){
  var config = require('./config.json');
  var statusService = new StatusService(config);
  var data = null;

  it('Should return an Object', function(done){
    statusService.report(function(err, result) {
      data = result;
      data.should.not.be.equal(null);
      data.should.be.instanceof(Object);
    });
    done();
  });

  it('Should have an id', function(done){
    data.should.have.property('id');
    done();
  });
  it('Should have a time stamp', function(done){
    data.should.have.property('time');
    done();
  });
  it('Should Define a report property of type array', function(done){
    data.should.have.property('report');
    data.report.should.be.instanceof(Array);
    done();
  });

  describe("Category Data", function() {
    it('Should define a code property');
    it('Should define a name property');
    it('Should define a systems property of type array');
    it('Should define a services property of type array');
  });

  describe("Systems Data", function() {
    it("Should define a code property");
    it("Should define a name property");
    it("Should define a status property");
  });

  describe("Services Data", function() {
    it("Should define a code property");
    it("Should define a name property");
    it("Should define a locations property of type array");
  });

  describe("Locations Data", function() {
    it("Should define a code property");
    it("Should define a name property");
    it("Should define a region property");
    it("Should define an enabled boolean property");
    it("Should define a status property");
  });

});
