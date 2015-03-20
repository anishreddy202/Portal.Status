///* global sinon, describe, it, afterEach, beforeEach, expect, inject */
//
//'use strict';
//
//describe('Security: AuthService', function () {
//
//  beforeEach(module('ngCookies'));
//  beforeEach(module('ui.auth'));
//
//  var service, $cookieStore;
//
//
//  beforeEach(inject(function (_authService_, _$cookieStore_) {
//    service = _authService_;
//    $cookieStore = _$cookieStore_;
//  }));
//
//  it('should be ok', function () {
//    service.should.be.ok();
//  });
//
//  it('should return a pre-existing "token" cookie', function() {
//    var data = 'Testing';
//    $cookieStore.put('token', data);
//    var token = service.getToken();
//    token.should.be.equal(data);
//  });
//
//  afterEach(function() {
//    $cookieStore.remove('token');
//  });
//
//});
