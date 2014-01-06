var auth = require("basic-auth");

function valid(user) {
  return user && user.name && user.pass;
}

module.exports = function () {

  return function *(next) {
    var user = auth(this);
    if (!valid(user)) return this.throw(401);
    this.user = user;
    yield next;
  };

};
