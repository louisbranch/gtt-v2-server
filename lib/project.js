var user = require("./user");

module.exports = {
  findAll: findAll,
  create: create
};

function *findAll() {
  this.body = this.user.projects;
}

function *create() {
  var project = new Project(this.query);
  this.user.projects.push(project);
  yield user.save(this.user, this.email, this);
  this.body = project;
}

function Project(params) {
  this.name = params.name;
  this.rate = params.rate;
  this.currrency = params.currrency || "usd";
}
