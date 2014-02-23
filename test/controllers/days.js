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
          start: "2014-01-19T21:05:59.234Z",
          tasks: [],
          pauses: []
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
        global.token + "&date=2014-01-19" +
        "&start=2014-01-19T21:05:59.234Z"
    }

  });

  describe("GET /projects/:id/days/:date", function(){

    describe("when date exists", function(){
      it("returns the date", function(done){
        request
        .get("/v1/projects/koajs/days/2014-01-19?" +
              "email=me@luizbranco.com&token=" +
              global.token)
        .expect(200)
        .expect({
          date: "2014-01-19",
          start: "2014-01-19T21:05:59.234Z",
          tasks: [],
          pauses: []
        }, done);
      });
    });

    describe("when date doesn't exist", function(){
      it("returns and error", function(done){
        request
        .get("/v1/projects/koajs/days/2014-01-18?" +
              "email=me@luizbranco.com&token=" +
              global.token)
        .expect(404)
        .expect("date doesn't exist", done);
      });
    });

  });

  describe("PUT /projects/:id/days/:date", function(){

    it("updates date information", function(done){
      request
      .put("/v1/projects/koajs/days/2014-01-19?" +
            "email=me@luizbranco.com&token=" +
            global.token + "&start=2014-01-19T10:11:25.234Z")
      .expect(200)
      .expect({
        date: "2014-01-19",
        start: "2014-01-19T10:11:25.234Z",
        tasks: [],
        pauses: []
      }, done);
    });

  });

  describe("POST /projects/:id/days/:date/tasks", function(){

    it("adds a new task", function(done){
      request
      .post("/v1/projects/koajs/days/2014-01-19/tasks?" +
            "email=me@luizbranco.com&token=" +
            global.token + "&end=2014-01-19T11:00:00.234Z" +
            "&message=Initial Commit&branch=master")
      .expect(200)
      .expect({
        end: "2014-01-19T11:00:00.234Z",
        message: "Initial Commit",
        branch: "master"
      }, done);
    });

  });

  describe("POST /projects/:id/days/:date/pause", function(){

    it("pauses the day", function(done){
      request
      .post("/v1/projects/koajs/days/2014-01-19/pause?" +
            "email=me@luizbranco.com&token=" +
            global.token + "&start=2014-01-19T12:00:00.234Z" +
            "&message=brb")
      .expect(200)
      .expect({
        start: "2014-01-19T12:00:00.234Z",
        message: "brb"
      }, done);
    });
  });

  describe("POST /projects/:id/days/:date/resume", function(){

    it("resumes the day", function(done){
      request
      .post("/v1/projects/koajs/days/2014-01-19/resume?" +
            "email=me@luizbranco.com&token=" +
            global.token + "&end=2014-01-19T12:30:00.234Z" +
            "&message=brb")
      .expect(200)
      .expect({
        start: "2014-01-19T12:00:00.234Z",
        end: "2014-01-19T12:30:00.234Z",
        message: "brb"
      }, done);
    });
  });

  describe("POST /projects/:id/days/:date/end", function(){

    it("ends the day", function(done){
      request
      .post("/v1/projects/koajs/days/2014-01-19/end?" +
            "email=me@luizbranco.com&token=" +
            global.token + "&end=2014-01-19T18:00:00.234Z" +
            "&message=brb")
      .expect(200)
      .expect({
        date: "2014-01-19",
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
      }, done);
    });
  });

});
