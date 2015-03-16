/* jshint -W024 */
/* jshint expr:true */
'use strict';

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var _ = require('lodash');
var app = require('../../../app');
var api = request(app);

describe('*** CRUD /api/v1/users/ ***', function() {
  var response, dto;

  before(function (done){
    dto = require('./user.json');
    done();
  });

  it('Creates a User and returns success with a user', function(done) {
    var newDTO = _.clone(dto);
    api.post('/api/v1/users/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(newDTO)
      .expect(200)
      .end(function(err, res) {
        assert.ok(err === null, err);
        res.body.id.should.not.be.null;
        response = res.body;
        done();
      })
  });


  it('Retrieves an item by Id', function(done) {
    api.get('/api/v1/users/' + response.id)
      .expect(200)
      .end(function (err, res) {
        assert.ok(err === null, err);
        var result = res.body;
        result.should.have.property('id', response.id);
        done();
      });
  });

  it('Defines a Property Id', function(done) {
    (response.id === null).should.be.false;
    response.id.should.not.be.null;
    done();
  });
  it('Defines a Property email', function(done) {
    response.should.have.property('email', dto.email);
    done();
  });
  it('Defines a Property firstName', function(done) {
    response.should.have.property('firstName', dto.firstName);
    done();
  });
  it('Defines a Property lastName', function(done) {
    response.should.have.property('lastName', dto.lastName);
    done();
  });
  it('Defines a Property userName', function(done) {
    response.should.have.property('userName', dto.userName);
    done();
  });

  it('Is found in the list', function(done) {
    api.get('/api/v1/users/')
      .expect(200)
      .end(function(err, res) {
        assert.ok(err === null, err);
        var result = res.body;
        var ourResult = _.where(result.users, {id: response.id});
        ourResult.should.have.length(1);
        done();
      });
  });

  it('Updates an item', function(done) {
    var changed = _.clone(response);
    changed.firstName = "ChangedFirst";
    changed.lastName = "ChangedLast";

    api.put('/api/v1/users/' + response.id)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(changed)
      .expect(200)
      .end(function(err, res) {
        assert.ok(err === null, err);
        var result = res.body;
        result.id.should.equal(changed.id);
        result.firstName.should.equal(changed.firstName);
        result.lastName.should.equal(changed.lastName);
        done();
      });
  });

  it('Deletes an item', function(done) {
    api.del('/api/v1/users/' + response.id)
      .expect(200)
      .end(done);
  });
});

describe('*** LIST /api/users ***', function() {
  var response = null;
  var id = null;

  before(function (done){
    var dto = require('./user.json');
    api.post('/api/v1/users')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(dto)
      .expect(200)
      .end(function(err, res) {
        assert.ok(err === null, err);
        res.body.id.should.not.be.null;
        id = res.body.id;
        done();
      })
  });

  it('should respond with JSON array', function(done) {
    api.get('/api/v1/users/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        assert.ok(err === null, err);
        response = res.body;
        response.users.should.be.instanceof(Array);
        done();
      });
  });
  it('defines a Property id', function(done){
    response.users[0].should.have.property('id');
    done();
  });
  it('defines a Property email', function(done) {
    response.users[0].should.have.property('email');
    done();
  });
  it('defines a Property firstName', function(done) {
    response.users[0].should.have.property('firstName');
    done();
  });
  it('defines a Property lastName', function(done) {
    response.users[0].should.have.property('lastName');
    done();
  });
  it('defines a Property userName', function(done) {
    response.users[0].should.have.property('userName');
    done();
  });

  after(function(done) {
    api.del('/api/v1/users/' + id)
      .expect(200, done)
  });
});

describe('*** Search /api/v1/users/ ***', function() {
  var response = null, dto;

  before(function (done){
    dto = require('./user.json');
    done();
  });

  it('Creates a User and returns success with a user', function(done) {
    var newDTO = _.clone(dto);
    api.post('/api/v1/users/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(newDTO)
      .expect(200)
      .end(function(err, res) {
        assert.ok(err === null, err);
        res.body.id.should.not.be.null;
        response = res.body;
        done();
      })
  });


  it('search an item by userName', function(done) {
    api.get('/api/v1/users/search/' + response.userName)
      .expect(200)
      .end(function (err, res) {
        assert.ok(err === null, err);
        var result = res.body;
        result.users.should.have.length(1);
        done();
      });
  });

  it('Deletes an item', function(done) {
    api.del('/api/v1/users/' + response.id)
      .expect(200)
      .end(done);
  });
});
