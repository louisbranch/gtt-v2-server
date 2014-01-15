var db = require("../services/db");
var _ = require("lodash");

module.exports = function () {

  return function *(next) {
    var auth = getAuth(this);
    var user = yield getUser(auth.email, this);

    if (!_.contains(auth.token, user.tokens)) {
      this.throw("invalid token", 401);
    }

    this.email = auth.email;
    this.user = user;
    yield next;
  };

};

function getAuth(ctx) {
  var email = ctx.query.email;
  var token = ctx.query.token;

  if (!email) ctx.throw("email required", 404);
  if (!token) ctx.throw("token required", 404);

  return {email: email, token: token};
}

function *getUser(email, ctx) {
  var doc;

  try {
    doc = yield db.get(email);
  } catch (e) {
    ctx.throw("email " + email + " not found", 401);
  }

  return _.first(doc);
}
