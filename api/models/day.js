var userModel = require("./user");
var _ = require("lodash");

module.exports = {
  create: create,
  find: find
};

function *create(project, params, user, email) {
  var day = {
    date: params.date,
    breaks: [],
    tasks: []
  };
  project.days.push(day);
  yield save(user, email);
  return day;
}

function *save(user, email) {
  yield userModel.save(user, email);
}

function find(date, days) {
  return _.find(days, function (day) {
    return day.date === date;
  });
}
