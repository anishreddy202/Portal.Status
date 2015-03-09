var should = require("should");
var User = require("../lib/user.model");
var NuxeoUser = require("../lib/nuxeo.user.model");

describe("User", function() {
  var user = new User({
        id: 1,
        userName: "mochaTest",
        email: "mail@test.com",
        firstName: "first",
        lastName: "last",
        groups: [ 'group' ]
      });

  var nuxeoPostUser = new NuxeoUser({
        userName: "mochaTest",
        email: "mail@test.com",
        firstName: "first",
        lastName: "last",
        groups: [ 'group' ]
      });


  describe("User Defaults", function() {
    it("has an id", function(){
      user.id.should.equal(1);
    });
    it("has a userName", function(){
      user.userName.should.equal("mochaTest");
    });
    it("has an email", function(){
      user.userName.should.equal("mochaTest");
    });
    it("has a firstName", function(){
      user.userName.should.equal("mochaTest");
    });
    it("has a lastName", function(){
      user.userName.should.equal("mochaTest");
    });
    it("has a list of groups", function() {
      user.groups.should.be.instanceof(Array);
      user.groups.should.be.have.length(1);
    });
  });


  describe("Nuxeo Post User Defaults", function() {
    it("has an id", function(){
      nuxeoPostUser.data.should.have.property('id', 'mochaTest');
    });
    it("has an entity-type", function(){
      nuxeoPostUser.data.should.have.property('entity-type', 'user');
    });
    it("has a userName", function(){
      nuxeoPostUser.data.properties.should.have.property('username', 'mochaTest');
    });
    it("has an email", function(){
      nuxeoPostUser.data.properties.should.have.property('email', 'mail@test.com');
    });
    it("has a firstName", function(){
      nuxeoPostUser.data.properties.should.have.property('firstName', 'first');
    });
    it("has a lastName", function(){
      nuxeoPostUser.data.properties.should.have.property('lastName', 'last');
    });
    it("has a list of groups", function() {
      nuxeoPostUser.data.properties.groups.should.be.instanceof(Array);
      nuxeoPostUser.data.properties.groups.should.be.have.length(1);
    });
  });

  describe("Nuxeo Mapping", function() {
    var mappedUser = new User(nuxeoPostUser.data);

    it("has an id", function(){
      mappedUser.id.should.equal("mochaTest");
    });
    it("has a userName", function(){
      mappedUser.userName.should.equal("mochaTest");
    });
    it("has an email", function(){
      mappedUser.userName.should.equal("mochaTest");
    });
    it("has a firstName", function(){
      mappedUser.userName.should.equal("mochaTest");
    });
    it("has a lastName", function(){
      mappedUser.userName.should.equal("mochaTest");
    });
    it("has a list of groups", function() {
      mappedUser.groups.should.be.instanceof(Array);
      mappedUser.groups.should.be.have.length(1);
    });
  });
});
