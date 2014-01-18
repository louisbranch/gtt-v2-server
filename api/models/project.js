var userModel = require("./user");
var _ = require("lodash");

module.exports = {
  create: create,
  update: update,
  find: find
};

function *create(params, user, email) {
  var project = {
    name: params.name,
    rate: params.rate || 0,
    currrency: params.currrency || "usd"
  };
  user.projects.push(project);
  yield userModel.save(user, email);
  return project;
}

function update(project, params) {
  _.each(project, function (value, key) {
  });
}

function find(name, projects) {
  return _.find(projects, function (project) {
    return project.name.toLowerCase() === name.toLowerCase();
  });
}

function *save(project, user, email) {
  // body...
}
