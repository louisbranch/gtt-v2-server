var app = require("../app");
var request = require("supertest").agent(app.listen());

describe("user sign up", function(){

  describe("valid params", function(){
    it("returns an user token", function(done){
      request
      .post("/v1/users?email=me@luizbranco.com&password=secret")
      .expect(200)
      .expect(/\w{32}/, done); // 32 chars token
    });
  });

});
