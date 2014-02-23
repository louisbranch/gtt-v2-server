var _ = require("lodash");
var helper = require("../helpers/day");

module.exports = {
  start: start,
  stop: stop
};

function start(day, params) {
  validateEnd(day);
  if (helper.isPaused(day)) throw("day is already paused");

  var pause = {
    start: params.start,
    message: params.message
  };
  day.pauses.push(pause);
  return pause;
}

function stop(day, params) {
  validateEnd(day);
  if (!helper.isPaused(day)) throw("day is not paused yet");

  var pause = _.last(day.pauses);
  pause.end = params.end
  return pause;
}

function validateEnd(day) {
  if (helper.isOver(day)) throw("day is already over");
}
