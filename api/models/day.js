var time = require("../helpers/time");
var helper = require("../helpers/day");
var _ = require("lodash");

module.exports = {
  create: create,
  update: update,
  find: find,
  end: end
};

function create(project, params) {
  var day = {
    date: params.date,
    start: params.start,
    pauses: [],
    tasks: []
  };
  validate(day);
  project.days.push(day);
  return day;
}

function update(day, params) {
  day.start = params.start;
  validate(day);
  return day;
}

function end(day, params) {
  if (helper.isPaused(day)) throw("day has been paused");
  day.end = params.end;
  day.duration = time.dayToMinutes(day);
  return day;
}

function validate(params) {
  var date = params.date;
  var start = params.start;

  if (!date) throw("date required");

  if (!date.match(/\d{4}-\d{2}-\d{2}/)) {
    throw("date format invalid: YYYY-MM-DD");
  }

  if (!start) throw("start required");

  if (!time.validate(start)) {
    throw("start time format invalid, use ISO 8601");
  }
}

function find(date, days) {
  return _.find(days, function (day) {
    return day.date === date;
  });
}
