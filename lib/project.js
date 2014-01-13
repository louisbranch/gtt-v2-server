var user = require("./user");
var _ = require("lodash");

module.exports = {
  findAll: findAll,
  create: create
};

function *findAll() {
  this.body = this.user.projects;
}

function *create() {
  if (!this.query.name) this.throw("name required", 404);

  var projects = this.user.projects;
  var project = new Project(this.query);
  if (exists(projects, project)) this.throw("project name already exists", 404);

  this.user.projects.push(project);
  yield user.save(this.user, this.email, this);
  this.body = project;
}

function Project(params) {
  this.name = params.name;
  this.rate = params.rate || 0;
  this.currrency = params.currrency || "usd";
}

function exists(projects, project) {
  return _.find(projects, function (p) {
    return p.name === project.name;
  });
}
