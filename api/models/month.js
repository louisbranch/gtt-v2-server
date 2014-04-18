var _ = require("lodash");

module.exports = {
  find: find
};

function find(date, project) {
  if (!date.match(/\d{4}-\d{2}/)) throw "invalid month format, use: YYYY-MM";
  var days = filterDays(date, project.days);
  var duration = sumDuration(days);
  var time = formatTime(duration);
  var cost = calculateCost(duration, project.rate);
  return {
    days: days,
    time: time,
    cost: cost,
    currency: project.currency
  };
}

function filterDays(date, projectDays) {
  var regex = new RegExp("^" + date);
  return _.filter(projectDays, function (day) {
    return day.date.match(regex);
  });
}

function sumDuration(days) {
  return _.reduce(days, function (acc, day) {
    return acc + day.duration;
  }, 0);
}

function formatTime(duration) {
  var hours = Math.ceil(duration/60);
  var mins = duration % 60;
  if (hours < 10) hours = "0" + hours;
  if (mins < 10) mins = "0" + mins;
  return hours + "h" + mins;
}

function calculateCost(duration, rate) {
  return duration * (rate / 60);
}
