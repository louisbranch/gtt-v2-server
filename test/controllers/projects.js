var app = require("../../app");
var request = require("supertest").agent(app.listen());

describe("projects controller", function(){

  describe("GET /projects", function(){

    describe("valid auth", function(){
      it("returns a list of projects", function(done){
        request
        .get("/v1/projects?email=me@luizbranco.com&token=" + global.token)
        .expect(200)
        .expect([{
          name: "KoaJS",
          rate: 30,
          currency: "usd",
          days: [{
            date: "2014-01-19",
            duration: 439,
            start: "2014-01-19T10:11:25.234Z",
            end: "2014-01-19T18:00:00.234Z",
            pauses: [
              {
                message: "brb",
                start: "2014-01-19T12:00:00.234Z",
                end: "2014-01-19T12:30:00.234Z"
              }
            ],
            tasks: [
              {
                end: "2014-01-19T11:00:00.234Z",
                message: "Initial Commit",
                branch: "master"
              }
            ]
          }]
        }], done);
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
          name:"NodeJS",
          rate:1,
          currency:"usd",
          days: []
        }, done);
      });
    });

    describe("missing name", function(){
      it("returns an error", function(done){
        request
        .post("/v1/projects?email=me@luizbranco.com&token=" + global.token)
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
      it("returns the project", function(done){
        request
        .get("/v1/projects/nodejs?email=me@luizbranco.com&token=" + global.token)
        .expect(200)
        .expect({
          currency: "usd",
          name: "NodeJS",
          rate: 1,
          days: []
        }, done);
      });
    });

    describe("when project doesn't exist yet", function(){
      it("returns the project", function(done){
        request
        .get("/v1/projects/unknown?email=me@luizbranco.com&token=" + global.token)
        .expect(404)
        .expect("project unknown doesn't exist", done);
      });
    });

  });

  describe("PUT /projects/:id", function(){

    describe("when project exists", function(){
      it("updates project info", function(done){
        request
        .put("/v1/projects/nodejs?email=me@luizbranco.com&token=" + global.token +
            "&currency=brl")
        .expect(200)
        .expect({
          currency: "brl",
          name: "NodeJS",
          rate: 1,
          days: []
        }, done);
      });
    });

    describe("when project doesn't exist yet", function(){
      it("returns the project", function(done){
        request
        .put("/v1/projects/unknown?email=me@luizbranco.com&token=" + global.token +
            "currency=&brl")
        .expect(404)
        .expect("project unknown doesn't exist", done);
      });
    });

  });

  function params() {
    return "/v1/projects?email=me@luizbranco.com&token=" + global.token +
      "&name=NodeJS";
  }

});
