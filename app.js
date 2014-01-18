var koa = require("koa");
var app = module.exports = koa();

var auth = require("./api/policies/authenticate")();
var users = require("./api/controllers/users");
var projects = require("./api/controllers/projects");
var days = require("./api/controllers/days");

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
app.get("/v1/projects/:id/days/:date", auth, days.findOne);
app.post("/v1/projects/:id/days", auth, days.create);
app.put("/v1/projects/:id/days/:date", auth, days.update);
app.post("/v1/projects/:id/days/:date/tasks", auth, days.tasks);
app.post("/v1/projects/:id/days/:date/breaks", auth, days.breaks);

// Months
app.get("/v1/projects/:id/months/:month");

if (!module.parent) app.listen(8080);
