var koa = require("koa"),
  app = koa(),
  authenticate = require("./lib/authenticate");

app.use(require("koa-trie-router")(app));

app.get("/v1/projects", authenticate(), function *() {
  this.body = this.user;
});

app.listen(8080);
