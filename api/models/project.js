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
    currency: params.currency || "usd",
    days: []
  };
  yield save(user, email, project);
  return project;
}

function *update(project, params, user, email) {
  _.each(project, function (value, key) {
    project[key] = params[key] || value;
  });
  yield save(user, email);
  return project;
}

function *save(user, email, project) {
  if (project) user.projects.push(project);
  yield userModel.save(user, email);
}

function find(name, projects) {
  return _.find(projects, function (project) {
    return project.name.toLowerCase() === name.toLowerCase();
  });
}
