var db = require("./db");
var _ = require("lodash");

module.exports = function () {

  return function *(next) {
    var email = this.query.email;
    var token = this.query.token;

    if (!email) this.throw("email required", 404);
    if (!token) this.throw("token required", 404);

    try {
      var doc = yield db.get(email);
    } catch (e) {
      this.throw("email " + email + " not found", 401);
    }

    var user = _.first(doc);
    if (!_.contains(token, user.tokens)) {
      this.throw("invalid token", 401);
    }

    this.user = user;
    yield next;
  };

};
