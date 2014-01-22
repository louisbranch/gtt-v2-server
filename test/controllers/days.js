var app = require("../../app");
var request = require("supertest").agent(app.listen());
var db = require("../../api/services/db");

describe("days controller", function(){

  before(function(done){
    request
    .post("/v1/projects?email=me@luizbranco.com&token=" + global.token +
         "&name=KoaJS")
    .end(done)
  });

  describe("POST /projects/:id/days/:date", function(){

    describe("when date doesn't exists", function(){

      it("return the new date", function(done){

        request
        .post(params())
        .expect(200)
        .expect({
          date: "2014-01-19",
          tasks: [],
          breaks: []
        }, done);
      });

    });

    describe("when date already exists", function(){

      it("returns an error", function(done){
        request
        .post(params())
        .expect(404)
        .expect("date already exists", done);
      });

    });

    function params() {
      return "/v1/projects/koajs/days?email=me@luizbranco.com&token=" +
        global.token + "&date=2014-01-19"
    }

  });

  describe("GET /projects/:id/days/:date", function(){

    describe("when date exists", function(){

      it("returns the date", function(done){
        request
        .get("/v1/projects/koajs/days/2014-01-19?" +
              "email=me@luizbranco.com&token=" +
              global.token + "&date=2014-01-19")
        .expect(200)
        .expect({
          date: "2014-01-19",
          tasks: [],
          breaks: []
        }, done);
      });

    });

    describe("when date doesn't exist", function(){

      it("returns and error", function(done){
        request
        .get("/v1/projects/koajs/days/2014-01-19?" +
              "email=me@luizbranco.com&token=" +
              global.token + "&date=2014-01-18")
        .expect(404)
        .expect("date doesn't exist", done);
      });

    });

  });

});
