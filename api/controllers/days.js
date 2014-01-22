var model = require("../models/day");
var projects = require("./projects");

module.exports = {
  create: create,
  findOne: findOne
};

function *create() {
  var project = projects.find(this);

  if (model.find(date(this), project.days)) {
    this.throw("date already exists", 404);
  }

  this.body = yield model.create(project, this.query, this.user,
                                 this.email);
}

function *findOne() {
  var project = projects.find(this);

  var day = model.find(date(this), project.days);

  if (!day) this.throw("date doesn't exist", 404);

  this.body = day;
}

function date(ctx) {
  var date = ctx.query.date;
  if (!date) throw("date required", 404);
  return date;
}
