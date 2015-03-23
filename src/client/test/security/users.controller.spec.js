/* global sinon, describe, it, afterEach, beforeEach, expect, inject */

'use strict';

describe('cmsApp.users', function () {
  var controller, initCtrl,time;
  var pageSize = 5;
  var currentPage = 0;
  var httpbackend;

  beforeEach(module('ui.bootstrap'));
  beforeEach(module('uiApp'));

  before(function(){
    console.log("one");
  });

  beforeEach(function() {
    module('uiApp.users',  function($provide) {
      specHelper.fakeRouteProvider($provide);
    });
    specHelper.injector(function($controller, $q, $rootScope, UserService,$timeout) {});

    sinon.stub(UserService, 'getUsers', function() {
      var deferred = $q.defer();
      var data = mockData.getUsers(pageSize, currentPage++);
      deferred.resolve(data);
      return deferred.promise;

    });

    sinon.stub(UserService, 'deleteUser', function() {
      var deferred = $q.defer();
      var data = mockData.deleteUser();
      deferred.resolve(data);
      return deferred.promise;
    });

    sinon.stub(UserService, 'createUser', function() {
      var deferred = $q.defer();
      var data = mockData.createUser();
      deferred.resolve(data);
      return deferred.promise;
    });

    sinon.stub(UserService, 'updateUser', function() {
      var deferred = $q.defer();
      var data = mockData.updateUser();
      deferred.resolve(data);
      return deferred.promise;
    });

    time = $timeout;

    $rootScope.$apply();
  });

  initCtrl = function(){
    controller = $controller('UsersCtrl');
  }


  describe('Users Module: Controller', function() {

    it('should be created successfully', function (done) {
      initCtrl();
      controller.should.be.defined;
      done();
    });

    var user = {};

    describe('after init', function(done) {
      it('should have at least 1 users', function (done) {
        console.log(controller);
        controller.currentPage.should.be.equal(0);
        controller.users.should.have.length(pageSize);
        user = controller.users[0];
        done();
      });

      it('should load more users', function(done, $timeout) {
        initCtrl();
        time.flush();
        controller.currentPage.should.be.equal(1);
        controller.users.should.have.length(4);

        done();
      });

      it('should view user', function(done) {
        controller.viewUser(user);
        controller.selectedUser.userName.should.be.equal('testUser1');
        done();
      });

      it('cancel viewed user', function(done) {
        controller.cancelUser();
        expect(controller.selectedUser).to.be.a('null');
        done();
      });

      it('update user', function(done) {
        controller.newUser = false;
        controller.viewUser(user);
        controller.saveUser();
        time.flush();
        expect(controller.selectedUser).to.be.a('null');
        done();
      });

      it('create user', function(done) {
        controller.addNewUser()
        controller.selectedUser = user;
        controller.saveUser();
        time.flush();
        expect(controller.selectedUser).to.be.a('null');
        done();
      });

      it('delete user', function(done) {
        controller.viewUser(user);
        controller.deleteUser();
        time.flush();
        expect(controller.selectedUser).to.be.a('null');
        done();
      });

    });

  });


  specHelper.verifyNoOutstandingHttpRequests();
});
