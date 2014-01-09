var db = process.env.CLOUDANT_URL;

module.exports = {
  DB: db || 'http://localhost:5984/'
};

