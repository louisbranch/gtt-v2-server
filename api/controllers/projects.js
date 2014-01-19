var model = require("../models/project");

module.exports = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  update: update,
  find: find
};

function *findAll() {
  this.body = this.user.projects;
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

  this.body = yield model.create(this.query, this.user, this.email);
}

function *update() {
  var project = find(this);
  this.body = yield model.update(project, this.query, this.user, this.email);
}

function find(ctx) {
  var name = ctx.params.id;
  var project = model.find(name, ctx.user.projects);
  if (!project) ctx.throw("project " + name + " doesn't exist", 404);
  return project;
}
