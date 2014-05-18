var _ = require("lodash");
var save = require("../models/user").save;
var model = require("../models/project");

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  find: find
};

function *findAll() {
  var projects = _.pluck(this.user.projects, "name");
  this.body = projects;
}

function *findOne() {
  this.body = find(this);
}

function *create() {
  var name = this.query.name;
  if (!name) this.throw("name required", 404);

  if (model.find(name, this.user.projects)) {
    this.throw("project name already exists", 404);
  }


  project = model.create(this.query, this.user);
  yield save(this.user, this.email);
  this.body = project;
}

function *update() {
  var project = find(this);
  project = model.update(project, this.query);
  yield save(this.user, this.email);
  this.body = project;
}

function find(ctx) {
  var name = ctx.params.id;
  var project = model.find(name, ctx.user.projects);
  if (!project) ctx.throw("project " + name + " doesn't exist", 404);
  return project;
}
