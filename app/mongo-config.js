var mongoose = require('mongoose');

var connectString = process.env.MONGOSTRING || 'mongodb://localhost/shortlydb';

  // TODO: we'll set this once we have MongoDB set up in Asure
mongoose.connect(connectString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', function() {
  console.log('connected to mongoose db...');
});

module.exports = db;
