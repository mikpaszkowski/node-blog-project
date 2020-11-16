"use strict";

var mongoose = require('mongoose');

var _require = require('validator'),
    isEmail = _require.isEmail;

var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter the email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'Password legth must be at least 10 characters']
  }
}); //function which runs after saving to the database

userSchema.post('save', function (doc, next) {
  console.log('New user was created & saved', doc);
  next();
}); //function which runs before saving to the database

userSchema.pre('save', function _callee(next) {
  var salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt());

        case 2:
          salt = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, salt));

        case 5:
          this.password = _context.sent;
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); //static function to log in the user

userSchema.statics.logIn = function _callee2(email, password) {
  var user, userAuth;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(this.findOne({
            email: email
          }));

        case 2:
          user = _context2.sent;

          if (!user) {
            _context2.next = 10;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 6:
          userAuth = _context2.sent;

          if (!userAuth) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", user);

        case 9:
          throw Error('Incorrect password');

        case 10:
          throw Error('Incorrect email');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

module.exports = mongoose.model('User', userSchema);