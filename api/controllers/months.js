var model = require("../models/month");
var projects = require("./projects");

module.exports = {
  findOne: findOne
};

function *findOne() {
  var date = this.params.month;
  if (!date) throw("month required", 404);

  var project = projects.find(this);
  this.body = model.find(date, project.days);
}

