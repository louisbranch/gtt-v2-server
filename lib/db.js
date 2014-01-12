var config = require("../config");
var nano = require("nano")(config.DB);
var thunk = require("thunkify");

var db = nano.use("gtt");

module.exports = {
  get: thunk(db.get),
  set: thunk(db.insert),
  create: thunk(nano.db.create),
  destroy: thunk(nano.db.destroy)
};
