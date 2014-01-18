var model = require("../../api/models/user");
var assert = require("assert");

describe("user model", function(){

  describe("create", function(){
    var user;

    before(function(){
      var gen = model.create("me@luizbranco.com", "secret");
      gen.next();
      gen.next("123");
      user = gen.next().value;
    });

    it("has a password salt", function(){
      assert.equal(user.salt.length, 172);
    });

    it("has a password hash", function(){
      assert.equal(user.hash.length, 186);
    });

    it("has an api token", function(){
      assert.equal(user.tokens[0].length, 32);
    });

    it("has an empty project list", function(){
      assert.equal(user.projects.length, 0);
    });

  });

});
