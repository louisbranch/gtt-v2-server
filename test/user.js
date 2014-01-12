var app = require("../app");
var request = require("supertest").agent(app.listen());

describe("POST /users", function(){

  describe("valid params", function(){
    it("returns an user token", function(done){
      request
      .post("/v1/users?email=me@luizbranco.com&password=secret")
      .expect(200)
      .expect(/\w{32}/, done); // 32 chars token
    });
  });

  describe("invalid email", function(){

    it("returns an error", function(done){
      request
      .post("/v1/users?password=secret")
      .expect(404)
      .expect("email required", done);
    });
  });

  describe("invalid password", function(){

    it("returns an error", function(done){
      request
      .post("/v1/users?email=me@luizbranco.com")
      .expect(404)
      .expect("password required", done);
    });
  });

});
