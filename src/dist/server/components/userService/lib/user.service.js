'use strict';

var assert = require('assert');
var _ = require('lodash');
var uuid = require('node-uuid');
var db = require("mongoDAL");
var User = require('./user.model.js');
var Verror = require('verror');


var UserService = function(config){
  var self = this;
  console.log(config);
  self.create = function(postedUser, done){
    postedUser.id = uuid.v4();
    var mappedUser = new User(postedUser);

    db.connect(config.mongo, function(err, db){
      var criteria = {'userName':mappedUser.userName}
      db.users.exists(criteria, function(err, result){
        if(result === false){
          db.users.saveData(mappedUser, function(err, result){
            assert.ok(err === null, err);

            var mappedUser = new User(result);
            done(err, mappedUser);
          });
        }
        else{
          err = "user name already exists";
          done(err, null);
        }

      });

    });
  };

  self.read = function(params, done) {
    console.log(config);
    db.connect(config.mongo, function (err, db) {
      db.users.first(params, function (err, result) {
        assert.ok(err === null, err);
        var mappedUser = null;

        if (result) {
          mappedUser = new User(result);
        }
        done(err, mappedUser);
      });
    });
  };

  self.update = function(user, done) {
    db.connect(config.mongo, function(err, db){
      db.users.updateOnly(user, user.id, function(err, result){
        assert.ok(err === null, err);

        self.read(user, function(err, readUser) {
          done(err, readUser);
        });
      });
    });
  };

  self.delete = function(user, done) {
    db.connect(config.mongo, function(err, db){
      db.users.destroy(user.id, function (err, result) {
        if (err === null && result === 'false') {
          err = "Update Failed";
        }
        done(err, result);
      });
    });
  };

  self.list = function(params, done){

   var filter = {
      query: {},
      limit: parseInt(params.pageSize) || 10,
      skip: (params.pageSize) * parseInt(params.pageIndex) || 0
    };

    var list = {
      pages: 0,
      currentPage: 0,
      count: 0,
      users: []
    };

    db.connect(config.mongo, function(err, db){
      db.users.length(function(err, length){
        assert.ok(err === null, err);

        if(length > 0) {
          db.users.paginationQuery(filter, function(err, result){
            assert.ok(err === null, err);
            list.currentPage = parseInt(params.pageIndex);
            list.count = length;
            list.users = result;
            done(err, list);
          });
        } else {
          done(err, list);
        }
      });
    });
  };

  self.search = function(params, done){

    var filter = {
      $or:[
        {"email":{'$regex' : '.*' + params.id + '.*'}},
        {"userName":{'$regex' : '.*' + params.id + '.*'}},
      ]};

    var list = {
      pages: 0,
      currentPage: 0,
      count: 0,
      users: []
    };

    console.log(filter);
    db.connect(config.mongo, function(err, db){
      db.users.query(filter, function(err, result){
        list.currentPage = 0;
        list.count = result.length;
        list.users = result;
        done(err, list);
      });
    });
  };

  return self;

};

module.exports = UserService;
