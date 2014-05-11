var save  = require("../models/user").save;
var model = require("../models/day");
var projects = require("./projects");

module.exports = {
  create: create,
  findOne: findOne,
  update: update,
  end: end,
  status: status,
  date: date
};

function *create() {
  var id = this.query.date;
  if (!id) throw("date required", 404);

  var project = projects.find(this);

  if (model.find(id, project.days)) {
    this.throw("date already exists", 404);
  }

  var day;

  try {
    day = model.create(project, this.query);
    yield save(this.user, this.email);
    this.body = day;
  } catch (e) {
    this.throw(e, 404);
  }

}

function *findOne() {
  this.body = date(this);
}

function *update() {
  var day = date(this);

  try {
    day = model.update(day, this.query);
    yield save(this.user, this.email);
    this.body = day;
  } catch (e) {
    this.throw(e, 400);
  }
}

function *end() {
  var day = date(this);
  try {
    day = model.end(day, this.query, this.user, this.email);
    yield save(this.user, this.email);
    this.body = day;
  } catch (e) {
    this.throw(e, 400);
  }
}

function *status() {
  var day = date(this);
  this.body = model.status(day);
}

function date(ctx) {
  var id = ctx.params.date;
  if (!id) throw("date required", 404);

  var project = projects.find(ctx);
  var day = model.find(id, project.days);
  if (!day) ctx.throw("date doesn't exist", 404);

  return day;
}
