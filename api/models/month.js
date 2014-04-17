var _ = require("lodash");

module.exports = {
  find: find
};

function find(date, project) {
  if (!date.match(/\d{4}-\d{2}/)) throw "invalid month format, use: YYYY-MM";
  var days = filterDays(date, project.days);
  var duration = sumDuration(days);
  var cost = calculateCost(duration, project.rate);
  return {
    days: days,
    duration: duration,
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

function calculateCost(duration, rate) {
  return 0; //TODO
}
