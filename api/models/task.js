var time = require("../helpers/time");
var helper = require("../helpers/day");

module.exports = {
  create: create
};

function create(day, params) {
  if (helper.isOver(day)) throw("day is already over");
  if (helper.isPaused(day)) throw("day has been paused");

  var task = factory(params);
  day.tasks.push(task);
  return task;
}

function factory(params) {
  var end = params.end;
  var msg = params.message;

  if (!end) throw("end required");

  if (!time.validate(end)) {
    throw("end time format invalid, use ISO 8601");
  }

  if (!msg) throw("message required");

  return {
    end: end,
    message: msg,
    branch: params.branch
  }
}
