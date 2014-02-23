module.exports = {
  validate: validate
};

function validate(time) {
  return !isNaN(Date.parse(time));
}
