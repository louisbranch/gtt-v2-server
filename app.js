var koa = require("koa");
var app = module.exports = koa();

var auth = require("./lib/authenticate")();
var user = require("./lib/user");
var project = require("./lib/project");

app.use(require("koa-trie-router")(app));

app.post("/v1/users", user.create);

app.get("/v1/projects", auth, project.findAll);
app.post("/v1/projects", auth, project.create);
app.get("/v1/projects/:id", auth, project.findOne);
app.put("/v1/projects/:id", auth, project.update);

if (!module.parent) app.listen(8080);
