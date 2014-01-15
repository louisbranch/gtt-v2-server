var app = require("../app");
var request = require("supertest").agent(app.listen());
var db = require("../api/services/db");

describe("projects", function(){
  var token;

  before(function(done){
    db.create("gtt", done);
  });

  after(function(done){
    db.destroy("gtt", done);
  });

  before(function(done){
    request
    .post("/v1/users?email=me@luizbranco.com&password=secret")
    .end(function (err, res) {
      if (err) throw err;
      token = res.text;
      done();
    });
  });

  describe("GET /projects", function(){

    describe("valid auth", function(){
      it("returns a list of projects", function(done){
        request
        .get("/v1/projects?email=me@luizbranco.com&token=" + token)
        .expect(200)
        .expect("[]", done);
      });
    });

    describe("missing email", function(){
      it("return an error", function(done){
        request
        .get("/v1/projects")
        .expect(404)
        .expect("email required", done);
      });
    });

    describe("missing token", function(){
      it("return an error", function(done){
        request
        .get("/v1/projects?email=me@luizbranco")
        .expect(404)
        .expect("token required", done);
      });
    });

  });

  describe("POST /projects", function(){

    describe("valid project data", function(){
      it("returns the newly created project", function(done){
        request
        .post(params() + "&rate=1")
        .expect(200)
        .expect({
          "name":"ReplayPoker",
          "rate":1,
          "currrency":"usd"
        }, done);
      });
    });

    describe("missing name", function(){
      it("returns an error", function(done){
        request
        .post("/v1/projects?email=me@luizbranco.com&token=" + token)
        .expect(404)
        .expect("name required", done);
      });
    });

    describe("name already exists", function(){

      beforeEach(function(done){
        request.post(params())
        done();
      });

      it("returns an error", function(done){
        request.post(params())
        .expect(404)
        .expect("project name already exists", done);
      });
    });

  });

  describe("GET /projects/:id", function(){

    describe("when project exists", function(){
      beforeEach(function(done){
        request.post(params())
        done();
      });

      it("returns the project", function(done){
        request
        .get("/v1/projects/replaypoker?email=me@luizbranco.com&token=" + token)
        .expect(200)
        .expect({
          currrency: "usd",
          name: "ReplayPoker",
          rate: 1
        }, done);
      });

    });

  });

  describe("PUT /projects/:id", function(){

  });

  function params() {
    return "/v1/projects?email=me@luizbranco.com&token=" + token +
      "&name=ReplayPoker";
  }

});
