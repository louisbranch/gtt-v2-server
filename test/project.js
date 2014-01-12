var app = require("../app");
var request = require("supertest").agent(app.listen());

describe("projects", function(){
  var token;

  beforeEach(function(done){
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
      xit("returns a list of projects", function(done){
        request
        .post("/v1/projects?email=me@luizbranco.com&token=" + token)
        .expect(200)
        .expect("[]", done);
      });
    });

    describe("missing email", function(){
      it("return an error", function(done){
        request
        .post("/v1/projects")
        .expect(404)
        .expect("email required", done);
      });
    });

    describe("missing token", function(){
      it("return an error", function(done){
        request
        .post("/v1/projects?email=me@luizbranco")
        .expect(404)
        .expect("token required", done);
      });
    });

  });

});
