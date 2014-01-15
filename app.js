var koa = require("koa");
var app = module.exports = koa();

var auth = require("./api/policies/authenticate")();
var users = require("./api/controllers/users");
var projects = require("./api/controllers/projects");

// Middlewares ----------------------------- //

app.use(require("koa-trie-router")(app));

// Routing --------------------------------- //

// Users
app.post("/v1/users", users.create);

// Projects
app.get("/v1/projects", auth, projects.findAll);
app.post("/v1/projects", auth, projects.create);
app.get("/v1/projects/:id", auth, projects.findOne);
app.put("/v1/projects/:id", auth, projects.update);

// Days
app.get("/v1/projects/:id/days/:date");
app.put("/v1/projects/:id/days/:date");
app.post("/v1/projects/:id/days/:date/tasks");
app.post("/v1/projects/:id/days/:date/breaks");

if (!module.parent) app.listen(8080);
