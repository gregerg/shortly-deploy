var mongoose = require('mongoose');
if process.env === 'production'
mongoose.connect('mongodb://localhost/test');
