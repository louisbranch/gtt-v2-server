var _ = require("lodash");

module.exports = {
  isOver: isOver,
  isPaused: isPaused
};

function isPaused(day) {
  var pause = _.last(day.pauses);
  if (!pause) return false;
  return !pause.end;
}

function isOver(day) {
  return !!day.end;
}
