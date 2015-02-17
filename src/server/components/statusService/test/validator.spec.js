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
  var data = require('../lib/files/defaultReport');

  it("Default Report Validates", function() {
    validator.validate(data.report, function(err, result){
      (err === null).should.be.true;
      console.log(result);
    });
  });

  describe("Category Object", function() {

    it("Defines a required code property", function() {
      var category = _.clone(data.report[0]);
      delete category.code;

      validator.validate([category], function(err, result){
        var category = result[0];

        (err === null).should.be.false;
        category.should.not.have.property('code');
      });
    });

    it("Restricts code property to specific values", function() {
      var category = _.clone(data.report[0]);
      category.code = "BAD";

      validator.validate([category], function(err, result){
        var category = result[0];

        (err === null).should.be.false;
        category.should.have.property('code');
      });
    });

    it("Defines a required name property", function() {
      var category = _.clone(data.report[0]);
      delete category.name;

      validator.validate([category], function(err, result){
        var category = result[0];

        (err === null).should.be.false;
        category.should.not.have.property('name');
      });
    });

    it("Defines a system property as an array", function() {
      var category = _.clone(data.report[0]);

      validator.validate([category], function(err, result){
        var category = result[0];

        (err === null).should.be.true;
        category.should.have.property('systems');
        category.systems.should.be.instanceof(Array);
      });
    });

    it("Allows system property to be optional", function() {
      var category = _.clone(data.report[0]);
      delete category.systems;

      validator.validate([category], function(err, result){
        var category = result[0];

        (err === null).should.be.true;
        category.should.not.have.property('systems');
      });
    });

    it("Defines a services property as an arry", function() {
      var category = _.clone(data.report[0]);

      validator.validate([category], function(err, result){
        var category = result[0];

        (err === null).should.be.true;
        category.should.have.property('services');
        category.services.should.be.of.instanceof(Array);
      });
    });

  });

});
