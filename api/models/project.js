module.exports = Project;

function Project(params) {
  this.name = params.name;
  this.rate = params.rate || 0;
  this.currrency = params.currrency || "usd";
}
