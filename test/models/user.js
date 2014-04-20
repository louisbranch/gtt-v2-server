var model = require("../../api/models/user");
var co = require("co");
var assert = require("assert");

describe("user model", function(){

  describe("create", function(){
    var user;

    before(function(done){
      var gen = model.create({
        email: "user@luizbranco.com",
        password: "secret"
      });
      co(function* () {
        user = yield gen;
        done();
      })();
    });

    it("has a password salt", function(){
      assert.equal(user.salt.length, 172);
    });

    it("has a password hash", function(){
      assert.equal(user.hash.length, 355);
    });

    it("has an api token", function(){
      assert.equal(user.tokens[0].length, 32);
    });

    it("has an empty project list", function(){
      assert.equal(user.projects.length, 0);
    });

  });

  describe("login", function(){

    describe("valid credentials", function(){
      it("returns the user", function(done){
        var user;
        var gen = model.login({
          email: "me@luizbranco.com",
          password: "secret"
        });
        co(function* () {
          user = yield gen;
          assert(user.tokens);
          done();
        })();
      });
    });

    describe("missing user", function(){
      it("returns an error", function(done){
        var error;
        var gen = model.login({
          email: "none",
          password: "secret"
        });
        co(function* () {
          try {
            yield gen;
          } catch (e) {
            error = e;
          }
          assert.equal("invalid credentials", error);
          done();
        })();
      });
    });

    describe("wrong password", function(){
      it("returns an error", function(done){
        var error;
        var gen = model.login({
          email: "user@luizbranco.com",
          password: "nothatsecret"
        });
        co(function* () {
          try {
            yield gen;
          } catch (e) {
            error = e;
          }
          assert.equal("invalid credentials", error);
          done();
        })();
      });
    });

  });

});
