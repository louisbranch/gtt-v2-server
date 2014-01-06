var koa = require("koa")
  , router = require("koa-route")
  , app = koa();

app.use(router.get("/projects", function *() {
  this.body = "/projects";
}));

app.listen(8080);
