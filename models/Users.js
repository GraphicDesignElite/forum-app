
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	username:{type: String, lowercase: true, unique: true},
    email:{type: String, unique: true},
    verified: {type: Boolean, default: true},
    comments: {type: Number, default: 0},
    posts: {type: Number, default: 0},
    userrole: {type: String, default: 'User'},
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  // set expiration to 1 day
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 1);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, '2455645364365676gdfsggfdsgs');
};


mongoose.model('User', UserSchema);