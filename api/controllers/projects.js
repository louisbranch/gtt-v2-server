var _ = require("lodash");
var User = require("../models/user");
var Project = require("../models/project");

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create
};

function *findAll() {
  this.body = this.user.projects;
}

function *findOne() {
  var name = this.params.id;
  var project = find(this.user.projects, name);
  if (!project) this.throw("project " + name + " doesn't exist", 404);
  this.body = project;
}

function *create() {
  var name = this.query.name;
  if (!name) this.throw("name required", 404);

  if (find(this.user.projects, name)) {
    this.throw("project name already exists", 404);
  }

  var project = new Project(this.query);
  this.user.projects.push(project);
  yield User.prototype.save.call(this.user, this.email, this);
  this.body = project;
}

function find(projects, name) {
  return _.find(projects, function (project) {
    return project.name.toLowerCase() === name.toLowerCase();
  });
}
