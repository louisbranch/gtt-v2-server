var app = require("../app");
var request = require("supertest").agent(app.listen());
var db = require("../api/services/db");

before(function(done){
  db.create("gtt", done);
});

before(function(done){
  request
  .post("/v1/users?email=me@luizbranco.com&password=secret")
  .end(function (err, res) {
    if (err) throw err;
    global.token = res.text;
    done();
  });
});

before(function(done){
  request.post( "/v1/projects?email=me@luizbranco.com&token=" + global.token +
    "&name=NodeJS")
  done();
});

after(function(done){
  db.destroy("gtt", done);
});
