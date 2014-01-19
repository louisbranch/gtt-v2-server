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
        .post("/v1/projects/koajs/days?email=me@luizbranco.com&token=" +
              global.token + "&date=2014-01-19")
        .expect(200)
        .expect({
          date: "2014-01-19",
          tasks: [],
          breaks: []
        }, done);
      });

    });

  });

  describe("GET /projects/:id/days/:date", function(){

  });

});
