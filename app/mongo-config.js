var mongoose = require('mongoose');

if (process.env === 'production') {
  // TODO: we'll set this once we have MongoDB set up in Asure
} else {
  mongoose.connect('mongodb://localhost/shortlydb');
}

var db = mongoose.connection;
db.on('open', function() {
  console.log('connected to mongoose db...');
});

module.exports = db;
