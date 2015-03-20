///* jshint -W024 */
///* jshint expr:true */
//'use strict';
//
//var should = require('should');
//var assert = require('assert');
//var UserService = require('../lib/user.service');
//var db = require("mongoDAL");
//
//
//describe("Mongo UserService", function(){
//  var config = require('./config.json');
//  var userService = null;
//
//  before(function(done){
//    db.connect(config.mongo, function(err, db){
//      db.dropDb(config.mongo.db, function(err, result){
//        db.install(['users'], function(err, result){
//          done();
//        });
//      });
//    });
//  });
//
//  describe("Create User", function(done) {
//    var userService = new UserService(config);
//    var dto = require('./user.json');
//    var user = null;
//
//    it('Creates a User and returns success with a user', function(done){
//      dto = require('./user.json');
//      userService.create(dto, function(err, result) {
//        user = result;
//        user.should.not.be.equal(null);
//        console.log(user);
//        done();
//      });
//    });
//    it('Defines a Property Id', function(done) {
//      (user.id === null).should.be.false;
//      done();
//    });
//    it('Defines a Property email', function(done) {
//      user.should.have.property('email', dto.email);
//      done();
//    });
//    it('Defines a Property firstName', function(done) {
//      user.should.have.property('firstName', dto.firstName);
//      done();
//    });
//    it('Defines a Property lastName', function(done) {
//      user.should.have.property('lastName', dto.lastName);
//      done();
//    });
//    it('Defines a Property userName', function(done) {
//      user.should.have.property('userName', dto.userName);
//      done();
//    });
//
//    after(function(done){
//      userService.delete(user, function(err, result) {
//        done();
//      });
//    });
//  });
//
//  describe("Read User", function(done) {
//    var config = require('./config.json');
//    var userService = new UserService(config);
//    var dto = require('./user.json');
//    var user = null;
//
//    before(function(done){
//      userService.create(dto, function(err, result) {
//        user = result;
//        done();
//      });
//    });
//
//    it('Retrieves an item by userName', function(done) {
//      var params = { userName: user.userName };
//      userService.read(params, function(err, result) {
//        assert.ok(err === null, err);
//        (result === null).should.be.false;
//        done();
//      });
//    });
//
//    after(function(done){
//      userService.delete(user, function(err, result) {
//        done();
//      });
//    });
//  });
//
//  describe("Update User", function(done) {
//    var config = require('./config.json');
//    var userService = new UserService(config);
//    var dto = require('./user.json');
//    var user = null;
//
//    before(function(done){
//      userService.create(dto, function(err, result) {
//        user = result;
//        done();
//      });
//    });
//
//    it('Updates an item by Id', function(done) {
//      user.firstName = "ChangedFirst";
//      user.lastName = "ChangedLast";
//
//      userService.update(user, function(err, result) {
//        assert.ok(err === null, err);
//        (result === null).should.be.false;
//        result.firstName.should.equal(user.firstName);
//        result.lastName.should.equal(user.lastName);
//        done();
//      });
//    });
//
//    after(function(done){
//      userService.delete(user, function(err, result) {
//        done();
//      });
//    });
//  });
//
//  describe("Delete User", function(done) {
//    var config = null;
//    var userService = null;
//    var dto = require('./user.json');
//    var user = null;
//
//    beforeEach(function(done){
//      config = require('./config.json');
//      userService = new UserService(config);
//      userService.create(dto, function(err, result) {
//        assert.ok(err === null, err);
//        user = result;
//        done();
//      });
//    });
//
//    it('Deletes an item by Id', function(done) {
//      userService.delete(user, function(err, result) {
//        assert.ok(err === null, err);
//        (result === null).should.be.false;
//        done();
//      });
//    });
//  });
//
//  describe("User List", function(done){
//    var config = require('./config.json');
//    var userService = null;
//    var dto = null;
//    var user = null;
//
//    before(function(done){
//      config = require('./config.json');
//      dto = require('./user.json');
//      userService = new UserService(config);
//      userService.create(dto, function(err, result){
//        user = result;
//        done();
//      });
//    });
//
//    it('should respond with a JSON Object with Users as an Array', function(done) {
//      userService.list({pageSize: 5, pageIndex: 0}, function(err, result) {
//        (result === null).should.be.false;
//        result.users.should.be.instanceof(Array);
//        result.users.should.have.length(1);
//        user = result.users[0];
//        done();
//      });
//    });
//    it('Defines a Property Id', function(done) {
//      (user.id === null).should.be.false;
//      done();
//    });
//    it('Defines a Property email', function(done) {
//      user.should.have.property('email', dto.email);
//      done();
//    });
//    it('Defines a Property firstName', function(done) {
//      user.should.have.property('firstName', dto.firstName);
//      done();
//    });
//    it('Defines a Property lastName', function(done) {
//      user.should.have.property('lastName', dto.lastName);
//      done();
//    });
//    it('Defines a Property userName', function(done) {
//      user.should.have.property('userName', dto.userName);
//      done();
//    });
//
//    after(function(done){
//      userService.delete(user, function(err, result) {
//        done();
//      });
//    });
//  });
//
//});
//
//
