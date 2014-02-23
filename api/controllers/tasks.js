var model  = require("../models/task");
var save  = require("../models/user").save;
var date = require("./days").date;

module.exports = {
  create: create
};

function *create() {
  var day = date(this);
  var task;
  try {
    task = model.create(day, this.query);
    yield save(this.user, this.email);
    this.body = task;
  } catch (e) {
    this.throw(e, 400);
  }
}
