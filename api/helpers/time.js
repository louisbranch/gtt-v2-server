var _ = require("lodash");

module.exports = {
  validate: validate,
  dayToMinutes: dayToMinutes,
  display: display
};

function validate(time) {
  return !isNaN(Date.parse(time));
}

function dayToMinutes(day){
  var pauses = pausesInMinutes(day.pauses);
  var totalTime = dayInMinutes(day);
  return totalTime - pauses;
}

function display(minutes) {
  var hrs = Math.floor(minutes / 60);
  var min = minutes % 60;
  hrs = hrs < 10 ? "0" + hrs : hrs;
  min = min < 10 ? "0" + min : min;
  return hrs + ":" + min;
}

function dayInMinutes(day){
  var start = toMinutes(day.start);
  if (day.end) return toMinutes(day.end) - start;

  var task = _.last(day.tasks);
  if (task) return toMinutes(task.end) - start;

  return 0;
}

function pausesInMinutes(pauses){
  pauses = pauses || [];
  return pauses.reduce(function(acc, pause) {
    var end = toMinutes(pause.end);
    var start = toMinutes(pause.start);
    var total = end ? start - end : 0;
    return acc - total;
  }, 0);
}

function toMinutes(timeString){
  var date = new Date(timeString);
  if (!validate(date)) throw "Invalid date format";
  return Math.floor(date.getTime() / 1000 / 60);
}
