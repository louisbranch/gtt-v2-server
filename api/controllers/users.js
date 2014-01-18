var model = require("../models/user");

module.exports = {
  create: create,
  save: save
};

function *create() {
  var email = this.query.email;
  var pass = this.query.password;
  if (!email) this.throw("email required", 404);
  if (!pass) this.throw("password required", 404);

  var user = yield model.create(email, pass, this);
  this.body = user.tokens[0];
}

function *save(user, email) {
  yield model.save(user, email);
}
