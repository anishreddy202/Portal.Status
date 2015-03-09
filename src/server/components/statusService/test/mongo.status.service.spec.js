/* jshint -W024 */
/* jshint -W098 */
/* jshint expr:true */
'use strict';

var should = require('should');
var StatusService = require('../lib/mongo.status.service');

describe("Status Data", function(){
  var config = require('./config.json');
  var statusService = new StatusService(config);
  var data, category, system, service, location = null;

  it('Should return an Object', function(done){
    statusService.report(function(err, result) {
      (err === null).should.be.true;
      data = result;
      data.should.not.be.equal(null);
      data.should.be.instanceof(Object);
      done();
    });

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

    before(function(done) {
      category = data.report[0];
      done();
    });

    it('Should define a code property', function(done) {
      category.should.have.property('code');
      done();
    });
    it('Should define a name property', function(done) {
      category.should.have.property('name');
      done();
    });
    it('Should define a systems property of type array', function(done) {
      category.should.have.property('systems');
      category.systems.should.be.instanceof(Array);
      done();
    });
    it('Should define a services property of type array', function(done) {
      category.should.have.property('services');
      category.services.should.be.instanceof(Array);
      done();
    });
  });

  describe("Systems Data", function() {
    before(function(done) {
      system = category.systems[0];
      done();
    });

    it("Should define a code property", function(done) {
      system.should.have.property('code');
      done();
    });
    it("Should define a name property", function(done){
      system.should.have.property('name');
      done();
    });
    it("Should define a status property", function(done){
      system.should.have.property('status');
      done();
    });
  });

  describe("Services Data", function() {
    before(function(done) {
      service = category.services[0];
      done();
    });
    it("Should define a code property", function(done) {
      service.should.have.property('code');
      done();
    });
    it("Should define a name property", function(done){
      service.should.have.property('name');
      done();
    });
    it("Should define a locations property of type array", function(done){
      service.should.have.property('locations');
      service.locations.should.be.instanceof(Array);
      done();
    });
  });

  describe("Locations Data", function() {
    before(function(done){
      location = service.locations[0];
      done();
    });
    it("Should define a code property", function(done){
      location.should.have.property('code');
      done();
    });
    it("Should define a name property", function(done){
      location.should.have.property('name');
      done();
    });
    it("Should define a region property", function(done){
      location.should.have.property('region');
      done();
    });
    it("Should define an enabled boolean property", function(done){
      location.should.have.property('enabled');
      location.enabled.should.be.instanceof(Boolean);
      done();
    });
    it("Should define a status property", function(done){
      location.should.have.property('status');
      done();
    });
  });

});
