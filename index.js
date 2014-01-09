var koa = require("koa"),
  app = koa(),
  authenticate = require("./lib/authenticate"),
  User = require("./lib/user");

app.use(require("koa-trie-router")(app));

app.post("/v1/users", function *() {
  var user = new User(this);
  this.body = user.token();
});

app.get("/v1/projects", authenticate(), function *() {
  this.body = this.user.projects;
});

app.listen(8080);
