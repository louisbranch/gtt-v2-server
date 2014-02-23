var save  = require("../models/user").save;
var model = require("../models/pause");
var date = require("./days").date;

module.exports = {
  start: start,
  stop: stop
};

function *start() {
  var day = date(this);
  var pause;
  try {
    pause = model.start(day, this.query);
    yield save(this.user, this.email);
    this.body = pause;
  } catch (e) {
    this.throw(e, 400);
  }
}

function *stop() {
  var day = date(this);
  var pause;
  try {
    pause = model.stop(day, this.query);
    yield save(this.user, this.email);
    this.body = pause;
  } catch (e) {
    this.throw(e, 400);
  }
}
