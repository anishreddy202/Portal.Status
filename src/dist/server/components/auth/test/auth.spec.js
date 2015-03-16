var assert = require("assert");
var should = require("should");
var db = require("../../mongoDAL");
var config = require('./config.json');


describe("Authentication", function() {
  var userService = require('../../UserService');
  userService.setup(config);

  var Authentication = require("../../authentication");
  Authentication.setup(config);

  //var reg = {};
  //var auth = {};
  var dto = require('./user.json');
  var user = null;

  before(function(done) {
    db.connect(config.mongo, function(err, db){
      db.dropDb(config.mongo.db, function(err, result){
        db.install(['users', 'logs'], function(err, result){
          userService.create(dto, function(err, result) {
            user = result;
            done();
          });
        });
      });
    });
  });

  describe("a valid login", function(done) {
    var authResult = {};

    before(function(done){
      var credentials = { 'userLogin': user.userName, 'password': "password"};
      Authentication.authenticate(credentials, function(err, result) {
        assert.ok(err === null, err);
        authResult = result;
        done();
      });
    });

    it("is successful", function() {
      authResult.success.should.equal(true);
    });
    it("returns a user", function() {
      should.exist(authResult.user);
    });
    it("creates a log entry", function() {
      should.exist(authResult.log);
    });

  });

  describe("empty login", function() {
    var authResult = {};

    before(function(done){
      var credentials = { 'userLogin': null, 'password': "password"};
      Authentication.authenticate(credentials, function(err, result) {
        assert.ok(err === null, err);
        authResult = result;
        done();
      });
    });

    it("is not successful", function() {
      authResult.success.should.equal(false);
    });
    it("returns a message saying 'Invalid Login'", function() {
      authResult.message.should.equal("Invalid Login");
    });
  });

  describe("empty password", function() {
    var authResult = {};

    before(function(done){
      var credentials = { 'userLogin': user.userName, 'password': ""};
      Authentication.authenticate(credentials, function(err, result) {
        assert.ok(err === null, err);
        authResult = result;
        done();
      });
    });

    it("is not successful", function() {
      authResult.success.should.equal(false);
    });
    it("returns a message saying 'Invalid Login'", function() {
      authResult.message.should.equal("Invalid Login");
    });
  });

  describe("user not found", function() {
    var authResult = {};

    before(function(done){
      var credentials = { 'userLogin': 'badUser', 'password': ""};
      Authentication.authenticate(credentials, function(err, result) {
        assert.ok(err === null, err);
        authResult = result;
        done();
      });
    });

    it("is not successful", function() {
      authResult.success.should.equal(false);
    });
    it("returns a message saying 'Invalid Login'", function() {
      authResult.message.should.equal("Invalid Login");
    });

  });

  after(function(done) {
    userService.delete(user, function(err, result) {
      done();
    });
  });

});
