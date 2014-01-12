var koa = require("koa");
var app = module.exports = koa();

var authenticate = require("./lib/authenticate");
var user = require("./lib/user");
var project = require("./lib/project");

app.use(require("koa-trie-router")(app));

app.post("/v1/users", user.create);

app.get("/v1/projects", authenticate(), project.findAll);
app.post("/v1/projects", authenticate(), project.create);
app.get("/v1/projects/:id", authenticate(), project.findOne);
app.put("/v1/projects/:id", authenticate(), project.update);

if (!module.parent) app.listen(8080);
