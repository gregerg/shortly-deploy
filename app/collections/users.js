// NOTE: this file is not needed when using MongoDB
var db = require('../config');
// var db = require('../mongo-config');
var User = require('../models/user');

var Users = new db.Collection();

Users.model = User;

module.exports = Users;
