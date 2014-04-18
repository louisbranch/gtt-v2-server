var app = require("../../app");
var request = require("supertest").agent(app.listen());
var db = require("../../api/services/db");

describe("months controller", function(){

  before(function(done){
    request
    .post("/v1/projects?email=me@luizbranco.com&token=" + global.token +
         "&name=KoaJS")
    .end(done)
  });

  describe("GET /projects/:id/months/:month", function(){

    it("returns the date", function(done){
      request
      .get("/v1/projects/koajs/months/2014-01?" +
            "email=me@luizbranco.com&token=" +
            global.token)
      .expect(200)
      .expect({
          days: [
            {
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
            }
          ],
          time: "08h19",
          cost: 219.5,
          currency: "usd"
        }, done);
    });

  });

});

