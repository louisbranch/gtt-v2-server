var koa = require("koa"),
  app = koa(),
  authenticate = require("./lib/authenticate"),
  user = require("./lib/user"),
  project = require("./lib/project");

app.use(require("koa-trie-router")(app));

app.post("/v1/users", user.create);

app.get("/v1/projects", authenticate(), project.findAll);
app.post("/v1/projects", authenticate(), project.create);
app.get("/v1/projects/:id", authenticate(), project.findOne);
app.put("/v1/projects/:id", authenticate(), project.update);

app.listen(8080);
