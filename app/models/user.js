//var db = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

/*var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});
*/

var userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: String
});

// now stores hash: use model, not this
userSchema.pre('save', function(next) {
  var model = this;
  bcrypt.hash(this.password, null, null, function(err, hash) {
    model.password = hash;
    next();
  });
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if(err){ return callback(err); }
    callback(isMatch);
  });
};

/*
userSchema.methods.hashPassword = function(next) {
  bcrypt.hash(this.password, null, null, function(err, hash) {
    this.password = hash;
    console.log('hash', hash);
    next();
  });

  var cipher = Promise.promisify(bcrypt.hash);

  return cipher(this.password, null, null)
      .then(function(hash) {
        this.password = hash;
      });
};
*/

module.exports = User;
