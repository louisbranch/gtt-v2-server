var hat = require("hat");
var pswd = require("pswd")();
var crypto = require("crypto");

module.exports = {
  create: create
};

function *create() {
  var email = this.query.email;
  var pass = this.query.password;
  if (!email || !pass) this.throw(404);

  var salt = generateSalt();
  var hash = yield* pswd.hash(pass, salt);
  var token = generateToken();
  var user = {
    hash: hash,
    salt: salt,
    tokens: [token]
  }

  this.body = token;
}

/* Create random token */
function generateToken() {
  return hat();
}

/* Create random salt */
function generateSalt() {
  return crypto.randomBytes(128).toString("base64");
}
