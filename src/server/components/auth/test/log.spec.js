var should = require("should");
var Log = require("../../log");

describe("Log", function() {
    describe("Defaults", function() {
        var log = {};

        before(function() {
            log = new Log({subject: "Log Subject", entry: "Log Message", userId: 1});
        });

        it("has a subject", function(){
            log.subject.should.equal("Log Subject");
        });
        it("has an entry", function(){
            log.entry.should.equal("Log Message");
        });
        it("has a userId", function(){
            log.userId.should.equal(1);
        });
        //it("has a created Date", function(){
        //    log.createdAt.should.be.defined;
        //});
    });
});
