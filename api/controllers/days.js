var model = require("../models/day");
var projects = require("./projects");

module.exports = {
  create: create
};

function *create() {
  var date = this.query.date;
  if (!date) this.throw("date required", 404);

  var project = projects.find(this);

  if (model.find(date, projects.days)) {
    this.throw("date already exists", 404);
  }

  this.body = yield model.create(project, this.query, this.user, this.email);
}
