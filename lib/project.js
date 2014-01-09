module.exports = {
  findAll: findAll
};

function *findAll() {
  this.body = this.user.projects;
}
