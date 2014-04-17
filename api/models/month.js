var _ = require("lodash");

module.exports = {
  find: find
};

function find(date, days) {
  if (!date.match(/\d{4}-\d{2}/)) throw "invalid month format, use: YYYY-MM";
  var regex = new RegExp("^" + date);
  return _.filter(days, function (day) {
    return day.date.match(regex);
  });
}
