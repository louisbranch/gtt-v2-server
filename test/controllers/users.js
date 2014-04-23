var app = require("../../app");
var assert = require("assert");
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

    describe("when user already exists", function(){
      it("returns an error", function(done){
        request
        .post("/v1/signup?email=test@luizbranco.com&password=secret")
        .expect(400)
        .expect("user already exists", done);
      });
    });

  });

  describe("POST /login", function(){

    describe("valid credentials", function(){
      var body

      before(function(done){
        request
        .post("/v1/login?email=me@luizbranco.com&password=secret")
        .expect(200)
        .end(function (err, res) {
          body = res.body;
          done();
        });
      });

      it("returns an user token", function(){
        assert.equal(32, body.token.length);
      });

      it("returns the user project names", function(){
        assert.deepEqual(["KoaJS", "NodeJS"], body.projects);
      });

      it("returns the user email", function(){
        assert.deepEqual("me@luizbranco.com", body.email);
      });

    });

    describe("user doesn't exist", function(){
      it("returns an error", function(done) {
        request
        .post("/v1/login?email=none@luizbranco.com&password=secret")
        .expect(400)
        .expect("invalid credentials", done);
      });
    });

    describe("invalid credentials", function(){
      it("returns an error", function(done) {
        request
        .post("/v1/login?email=test@luizbranco.com&password=wrongone")
        .expect(400)
        .expect("invalid credentials", done);
      });
    });

    describe("missing email", function(){
      it("returns an error", function(done){
        request
        .post("/v1/login?password=secret")
        .expect(404)
        .expect("email required", done);
      });
    });

    describe("missing password", function(){
      it("returns an error", function(done){
        request
        .post("/v1/login?email=test@luizbranco.com")
        .expect(404)
        .expect("password required", done);
      });
    });

  });

});
