var koa = require("koa");
var app = module.exports = koa();

var auth = require("./api/policies/authenticate")();
var users = require("./api/controllers/users");
var projects = require("./api/controllers/projects");
var days = require("./api/controllers/days");
var tasks = require("./api/controllers/tasks");
var pauses = require("./api/controllers/pauses");
var months = require("./api/controllers/months");

// Middlewares ----------------------------- //

app.use(require("koa-trie-router")(app));

// Routing --------------------------------- //

// Users
app.post("/v1/signup", users.create);
app.post("/v1/login", users.login); //TODO

// Projects
app.get("/v1/projects", auth, projects.findAll);
app.post("/v1/projects", auth, projects.create);
app.get("/v1/projects/:id", auth, projects.findOne);
app.put("/v1/projects/:id", auth, projects.update);

// Days
app.get("/v1/projects/:id/days/:date", auth, days.findOne);
app.post("/v1/projects/:id/days", auth, days.create);
app.put("/v1/projects/:id/days/:date", auth, days.update);
app.post("/v1/projects/:id/days/:date/tasks", auth, tasks.create);
app.post("/v1/projects/:id/days/:date/pause", auth, pauses.start);
app.post("/v1/projects/:id/days/:date/resume", auth, pauses.stop);
app.post("/v1/projects/:id/days/:date/end", auth, days.end);

// Months
app.get("/v1/projects/:id/months/:month", auth, months.findOne);

if (!module.parent) app.listen(8080);
