var app = require("../../app");
var request = require("supertest").agent(app.listen());

describe("users controller", function(){

  describe("POST /signup", function(){

    describe("valid params", function(){
      it("returns an user token", function(done){
        request
        .post("/v1/signup?email=test@luizbranco.com&password=secret")
        .expect(200)
        .expect(/\w{32}/, done); // 32 chars token
      });
    });

    describe("missing email", function(){

      it("returns an error", function(done){
        request
        .post("/v1/signup?password=secret")
        .expect(404)
        .expect("email required", done);
      });
    });

    describe("missing password", function(){

      it("returns an error", function(done){
        request
        .post("/v1/signup?email=test@luizbranco.com")
        .expect(404)
        .expect("password required", done);
      });
    });

  });

  describe("POST /login", function(){

    describe("valid credentials", function(){
      xit("returns an user token", function(done){
        request
        .post("/v1/login?email=test@luizbranco.com&password=secret")
        .expect(200)
        .expect(/\w{32}/, done); // 32 chars token
      });
    });

    describe("invalid credentials", function(){
      xit("returns an error", function() {
        request
        .post("/v1/login?email=test@luizbranco.com&password=wrongone")
        .expect(404)
        .expect("wrong credentials", done);
      });
    });

    describe("missing email", function(){
      xit("returns an error", function(done){
        request
        .post("/v1/login?password=secret")
        .expect(404)
        .expect("email required", done);
      });
    });

    describe("missing password", function(){
      xit("returns an error", function(done){
        request
        .post("/v1/login?email=test@luizbranco.com")
        .expect(404)
        .expect("password required", done);
      });
    });

  });

});
