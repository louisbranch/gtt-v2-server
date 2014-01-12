var hat = require("hat");
var pswd = require("pswd")();
var crypto = require("crypto");
var db = require("./db");

module.exports = {
  create: create
};

function *User(pass) {
  var salt = generateSalt();
  var hash = yield* pswd.hash(pass, salt);
  var token = generateToken();

  this.salt = salt;
  this.hash = hash;
  this.tokens = [token];
  this.projects = [];

  return this;
}

User.prototype.create = function* (email, ctx) {
  var doc;

  try {
    doc = yield db.set(this, email);
  } catch (e) {
    ctx.throw(400)
  }

  return doc;
};

function *create() {
  var email = this.query.email;
  var pass = this.query.password;
  if (!email) this.throw("email required", 404);
  if (!pass) this.throw("password required", 404);

  var user = yield (new User(pass));
  yield user.create(email, this);
  this.body = user.tokens[0];
}

/* Create random token */
function generateToken() {
  return hat();
}

/* Create random salt */
function generateSalt() {
  return crypto.randomBytes(128).toString("base64");
}
