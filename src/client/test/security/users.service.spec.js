///* global sinon, describe, it, afterEach, beforeEach, expect, inject */
//
//'use strict';
//
//describe('Users Module: Data Service', function () {
//
//  var service, httpBackend;
//
//  beforeEach(module('uiApp.users'));
//
//  beforeEach(inject(function (_UserService_, $httpBackend) {
//    service = _UserService_;
//    httpBackend = $httpBackend;
//  }));
//
//  it('Should get a list of Users', function () {
//
//    httpBackend.whenGET("/api/v1/users?pageSize=5&pageIndex=0").respond(mockData.getUsers(5, 0));
//
//    service.getUsers(5,0).success(function(result) {
//      result.data.count.should.equal(9);
//      result.data.pages.should.equal(2);
//      result.data.currentPage.should.equal(0);
//      result.data.users.length.should.equal(5);
//      var user = result.data.users[0];
//      user.should.have.property('firstName');
//      user.should.have.property('lastName');
//      user.should.have.property('userName');
//      user.should.have.property('email');
//      user.should.have.property('groups');
//    });
//    httpBackend.flush();
//  });
//
//  it('Should update a user', function () {
//
//    var updateuser = {
//      "id":1,
//      "userName": "testUser1",
//      "email": "testUser1@mail.com",
//      "firstName": "Test",
//      "lastName": "User1",
//      "groups": ["members"]
//    }
//
//    httpBackend.whenPUT("/api/v1/users/" +updateuser.id ).respond(mockData.updateUser());
//
//    service.updateUser(updateuser).success(function(result) {
//      result.data.userName.should.equal("updatetestUser9");
//    });
//    httpBackend.flush();
//  });
//
//  it('Should create a user', function () {
//
//    var posteduser = {
//      "id":10,
//      "userName": "testUser10",
//      "email": "testUser10@mail.com",
//      "firstName": "Test",
//      "lastName": "User10",
//      "groups": ["members"]
//    }
//
//    httpBackend.whenPOST("/api/v1/users/").respond(mockData.createUser());
//
//    service.createUser(posteduser).success(function(result) {
//      result.data.userName.should.equal("testUser10");
//    });
//    httpBackend.flush();
//  });
//
//  it('Should delete a user', function () {
//
//    var deleteUser = {
//      "id":10
//    }
//
//    httpBackend.whenDELETE("/api/v1/users/" + deleteUser.id).respond(mockData.deleteUser(deleteUser.id));
//
//    service.deleteUser(deleteUser.id).success(function(result) {
//      result.data.should.equal(true);
//    });
//
//    httpBackend.flush();
//  });
//
//
//
//  afterEach(function() {
//    //$cookieStore.remove('token');
//  });
//
//});
