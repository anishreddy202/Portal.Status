/* jshint -W098 */
/* jshint -W030 */
/* jshint -W117 */

'use strict';

var should = require('should');
var _ = require('lodash');
var Validator = require('../lib/validator');
var log = false;

describe("Schema Validation", function() {
  var validator = new Validator();
  var data, category, system, service, location = null;

  beforeEach(function(){
    data = JSON.parse(require('fs').readFileSync(__dirname + '/../lib/files/defaultReport.json', 'utf8'));
    category = _.clone(data.report[0]);
    system = category.systems[0];
    service = category.services[0];
    location = service.locations[0];
  });

  it("The Default Report Validates with no errors", function() {
    console.log(data.report);
    validator.validate(data.report, function(err, result){
      console.log(err);
      (err === null).should.be.true;

    });
  });

 ////////////   CATEGORY  ////////////
 describe("Category Schema", function(done) {
    it("Defines a required code property", function(done) {
      delete category.code;

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];

        (err === null).should.be.false;
        cleanCategory.should.not.have.property('code');
        done();
      });
    });
    it("Restricts code property to specific values", function(done) {
      category.code = "BAD";

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];

        (err === null).should.be.false;
        cleanCategory.should.have.property('code');
        done();
      });
    });
    it("Defines a required name property", function(done) {
      delete category.name;

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];

        (err === null).should.be.false;
        cleanCategory.should.not.have.property('name');
        done();
      });
    });
    it("Defines a required system property as an array", function(done) {

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];

        (err === null).should.be.true;
        cleanCategory.should.have.property('systems');
        cleanCategory.systems.should.be.instanceof(Array);
        done();
      });
    });
    it("Allows for no systems when category Code is RTE", function(done) {
      var tmpCategory = _.clone(data.report[2]);
      delete tmpCategory.systems;

      validator.validate([tmpCategory], function(err, result){
        var cleanCategory = result[0];

        (err === null).should.be.true;
        cleanCategory.should.not.have.property('systems');
        done();
      });
    });
    it("Defines a required services property as an array", function(done) {
      validator.validate([category], function(err, result){
        var cleanCategory = result[0];

        (err === null).should.be.true;
        cleanCategory.should.have.property('services');
        cleanCategory.services.should.be.of.instanceof(Array);
        done();
      });
    });
 });
 //
 //
 // ////////////   SYSTEMS  ////////////
 describe("Systems Schema", function(done) {

    beforeEach(function(){
      delete category.systems;
      category.systems = [];
    });

    it("Defines a required code property", function(done) {
      delete system.code;
      category.systems.push(system);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanSystem = cleanCategory.systems[0];

        (err === null).should.be.false;
        cleanSystem.should.not.have.property('code');
        done();
      });
    });
    it("Restricts code property to specific values", function(done){
      system.code = "BAD";
      category.systems.push(system);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanSystem = cleanCategory.systems[0];

        (err === null).should.be.false;
        cleanSystem.should.have.property('code');
        done();
      });
    });
    it("Defines a required name property", function(done) {
     delete system.name;
     category.systems.push(system);

     validator.validate([category], function(err, result){
       var cleanCategory = result[0];
       var cleanSystem = cleanCategory.systems[0];

       (err === null).should.be.false;
       cleanSystem.should.not.have.property('name');
       done();
     });
    });
    it("Defines a required status property", function(done) {
      delete system.status;
      category.systems.push(system);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanSystem = cleanCategory.systems[0];

        (err === null).should.be.false;
        cleanSystem.should.not.have.property('status');
        done();
      });
    });
    it("Restricts code property to specific values", function(done) {
      system.status = "BAD";
      category.systems.push(system);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanSystem = cleanCategory.systems[0];

        (err === null).should.be.false;
        cleanSystem.should.have.property('status');
        done();
      });
    });
 });

 //
 // ////////////   Services  ////////////
 describe("Services Schema", function(done) {

    beforeEach(function(){
      delete category.services;
      category.services = [];
    });

    it("Defines a required code property", function(done){
      delete service.code;
      category.services.push(service);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanService = cleanCategory.services[0];

        (err === null).should.be.false;
        cleanService.should.not.have.property('code');
        done();
      });
    });
    it("Restricts code property to specific values", function(done){
      service.code = "BAD";
      category.services.push(service);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanService = cleanCategory.services[0];

        (err === null).should.be.false;
        cleanService.should.have.property('code');
        done();
      });
    });
    it("Defines a required name property", function(done) {
      delete service.name;
      category.services.push(service);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanService = cleanCategory.services[0];

        (err === null).should.be.false;
        cleanService.should.not.have.property('name');
        done();
      });
    });
    it("Defines a required locations property as an array", function(done){
      category.services.push(service);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanService = cleanCategory.services[0];

        (err === null).should.be.true;
        cleanService.should.have.property('locations');
        cleanService.locations.should.be.of.instanceof(Array);
        done();
      });
    });
 });
 //
 // ////////////   Locations  ////////////
 describe("Locations Schema", function(done) {
    beforeEach(function(){
      delete service.locations;
      service.locations = [];
      delete category.services;
      category.services = [];
    });
    it("Defines a required code property", function(done){
      delete location.code;
      service.locations.push(location);
      category.services.push(service);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanService = cleanCategory.services[0];
        var cleanLocation = cleanService.locations[0];

        (err === null).should.be.false;
        cleanLocation.should.not.have.property('code');
        done();
      });
    });
    it("Restricts code property to specific values", function(done){
      location.code = "BAD";
      service.locations.push(location);
      category.services.push(service);
      //console.log(category.services[0].locations);

      validator.validate([category], function(err, result){
        var cleanCategory = result[0];
        var cleanService = cleanCategory.services[0];
        var cleanLocation = cleanService.locations[0];

        (err === null).should.be.false;
        cleanLocation.should.have.property('code');
        //console.log(err);
        done();
      });
    });

   it("Defines a required name property", function(done) {
     delete location.name;
     service.locations.push(location);
     category.services.push(service);

     validator.validate([category], function(err, result){
       var cleanCategory = result[0];
       var cleanService = cleanCategory.services[0];
       var cleanLocation = cleanService.locations[0];

       (err === null).should.be.false;
       cleanLocation.should.not.have.property('name');
       done();
     });
   });
   it("Defines a required region property", function(done) {
     delete location.region;
     service.locations.push(location);
     category.services.push(service);

     validator.validate([category], function(err, result){
       var cleanCategory = result[0];
       var cleanService = cleanCategory.services[0];
       var cleanLocation = cleanService.locations[0];

       (err === null).should.be.false;
       cleanLocation.should.not.have.property('region');
       done();
     });
   });
   it("Defines a required status property", function(done) {
     delete location.status;
     service.locations.push(location);
     category.services.push(service);

     validator.validate([category], function(err, result){
       var cleanCategory = result[0];
       var cleanService = cleanCategory.services[0];
       var cleanLocation = cleanService.locations[0];

       (err === null).should.be.false;
       cleanLocation.should.not.have.property('status');
       done();
     });
   });
   it("Restricts code property to specific values", function(done) {
     location.status = "BAD";
     service.locations.push(location);
     category.services.push(service);

     validator.validate([category], function(err, result){
       var cleanCategory = result[0];
       var cleanService = cleanCategory.services[0];
       var cleanLocation = cleanService.locations[0];

       (err === null).should.be.false;
       cleanLocation.should.have.property('status');
       done();
     });
   });

 });
});
