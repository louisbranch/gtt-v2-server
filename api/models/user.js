var hat = require("hat");
var pswd = require("pswd")();
var crypto = require("crypto");
var db = require("../services/db");

module.exports = {
  create: create,
  login: login,
  save: save
};

function *create(credentials) {
  var salt = generateSalt();
  var hash = yield* pswd.hash(credentials.password, salt);
  var token = generateToken();
  var user = {
    salt: salt,
    hash: hash,
    tokens: [token],
    projects: []
  };
  yield save(user, credentials.email);
  return user;
}

function *login(credentials) {
  var user;
  try {
    user = (yield db.get(credentials.email))[0];
  } catch (e) {
    throw("invalid credentials");
  }
  var hash = yield* pswd.hash(credentials.password, user.salt);
  if (hash !== user.hash) throw("invalid credentials");
  return user;
}

/* Save user to the database */
function *save(user, email) {
  var doc;
  try {
    doc = yield db.set(user, email);
  } catch (e) {
    throw(400, e);
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
