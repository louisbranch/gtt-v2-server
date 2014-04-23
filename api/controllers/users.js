var model = require("../models/user");
var _ = require("lodash");

module.exports = {
  create: create,
  login: login,
  save: save
};

function *create() {
  var credentials = validate(this);
  var user;
  try {
    user = yield model.create(credentials);
  } catch (e) {
    this.throw(e, 400);
  }
  this.body = _.first(user.tokens);
}

function *login() {
  var credentials = validate(this);
  var user;
  try {
    user = yield model.login(credentials);
  } catch (e) {
    this.throw(e, 400);
  }
  this.body = {
    email: credentials.email,
    token: _.last(user.tokens),
    projects: _.pluck(user.projects, "name")
  };
}

function *save(user, email) {
  yield model.save(user, email);
}

function validate(ctx) {
  var email = ctx.query.email;
  var pass = ctx.query.password;
  if (!email) ctx.throw("email required", 404);
  if (!pass) ctx.throw("password required", 404);
  return {email: email, password: pass};
}
