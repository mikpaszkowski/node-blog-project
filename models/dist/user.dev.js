"use strict";

var mongoose = require('mongoose');

var _require = require('validator'),
    isEmail = _require.isEmail;

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
});
module.exports = mongoose.model('User', userSchema);