var _ = require("lodash");

module.exports = {
  create: create,
  update: update,
  find: find
};

function create(params, user) {
  var project = {
    name: params.name,
    rate: params.rate || 0,
    currency: params.currency || "usd",
    days: []
  };
  user.projects.push(project);
  return project;
}

function update(project, params) {
  _.each(project, function (value, key) {
    project[key] = params[key] || value;
  });
  return project;
}

function find(name, projects) {
  return _.find(projects, function (project) {
    return project.name.toLowerCase() === name.toLowerCase();
  });
}
