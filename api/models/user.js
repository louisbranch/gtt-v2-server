var hat = require("hat");
var pswd = require("pswd")();
var crypto = require("crypto");
var db = require("../services/db");

module.exports = User;

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

/* Save user to the database */
User.prototype.save = function* (email, ctx) {
  var doc;
  try {
    doc = yield db.set(this, email);
  } catch (e) {
    ctx.throw(400)
  }
  return doc;
};

/* Create random token */
function generateToken() {
  return hat();
}

/* Create random salt */
function generateSalt() {
  return crypto.randomBytes(128).toString("base64");
}
