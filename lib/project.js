var user = require("./user");

module.exports = {
  findAll: findAll,
  create: create
};

function *findAll() {
  this.body = this.user.projects;
}

function *create() {
  if (!this.query.name) this.throw("name required", 404);

  var project = new Project(this.query);
  this.user.projects.push(project);
  yield user.save(this.user, this.email, this);
  this.body = project;
}

function Project(params) {
  this.name = params.name;
  this.rate = params.rate || 0;
  this.currrency = params.currrency || "usd";
}
