var hat = require("hat");
var pswd = require("pswd")();
var crypto = require("crypto");
var db = require("../services/db");

module.exports = {
  create: create,
  save: save
};

function *create(email, pass) {
  var salt = generateSalt();
  var hash = yield* pswd.hash(pass, salt);
  var token = generateToken();
  var user = {
    salt: salt,
    hash: hash,
    tokens: [token],
    projects: []
  };
  yield save(user, email)
  return user;
}

/* Save user to the database */
function *save(user, email) {
  var doc;
  try {
    doc = yield db.set(user, email);
  } catch (e) {
    throw(400)
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
