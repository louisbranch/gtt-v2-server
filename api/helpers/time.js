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
  var start = parse(day.start);
  if (day.end) return parse(day.end) - start;

  var task = _.last(day.tasks);
  if (task) return parse(task.end) - start;

  return 0;
}

function pausesInMinutes(pauses){
  return pauses.reduce(function(acc, pause) {
    var end = parse(pause.end);
    var start = parse(pause.start);
    var total = end ? start - end : 0;
    return acc - total;
  }, 0);
}

function parse(timeString){
  var regex = new RegExp("(\\d\\d):(\\d\\d)");
  var match = timeString.match(regex);
  if (!match) throw "Invalid time format"

  var hours = parseInt(match[1], 10);
  var minutes = parseInt(match[2], 10);
  return hours * 60 + minutes;
}
