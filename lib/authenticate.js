var getAuth = require("basic-auth");
var db = require("./db");
var _ = require("lodash");

function valid(auth) {
  return auth && auth.name && auth.pass;
}

function authenticate(user, token) {
  return _.contains(token, user.tokens);
}

module.exports = function () {

  return function *(next) {
    var auth = getAuth(this);
    if (!valid(auth)) return this.throw(401);

    try {
      var doc = yield db.get(auth.name);
    } catch (e) {
      return this.throw(401);
    }

    var user = _.first(doc);
    if (!authenticate(user, auth.pass)) return this.throw(401);

    this.user = user;
    yield next;
  };

};
