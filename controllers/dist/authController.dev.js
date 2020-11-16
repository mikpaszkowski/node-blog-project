"use strict";

var User = require('../models/user');

var jwt = require('jsonwebtoken');

var _require = require('moment'),
    max = _require.max;

var handleErrors = function handleErrors(err) {
  console.log(err.message, err.code);
  var errors = {
    email: '',
    password: ''
  }; //email

  if (err.message.includes('Incorrect email')) {
    errors.email = 'That email is not registered';
  } else if (err.message.includes('Incorrect password')) {
    errors.password = 'The password is incorrect';
  } //error code of duplicate records


  if (err.code == 11000) {
    errors.email = "This email already exists";
    return errors;
  } //errors


  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(function (_ref) {
      var properties = _ref.properties;
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

var maxAge = 3 * 60 * 60;

var createJWToken = function createJWToken(id) {
  return jwt.sign({
    id: id
  }, 'new user at my website', {
    expiresIn: maxAge
  });
};

var signup_get = function signup_get(req, res) {
  res.render('signup', {
    title: 'Sing Up'
  });
};

var signup_post = function signup_post(req, res) {
  var _req$body, email, password, user, token, errors;

  return regeneratorRuntime.async(function signup_post$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.create({
            email: email,
            password: password
          }));

        case 4:
          user = _context.sent;
          token = createJWToken(user._id);
          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(res.status(201).json({
            user: user._id
          }));

        case 9:
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          errors = handleErrors(_context.t0);
          res.status(400).json({
            errors: errors
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

var login_get = function login_get(req, res) {
  res.render('login', {
    title: 'Log In'
  });
};

var login_post = function login_post(req, res) {
  var _req$body2, email, password, user, token, errors;

  return regeneratorRuntime.async(function login_post$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.logIn(email, password));

        case 4:
          user = _context2.sent;
          token = createJWToken(user._id);
          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
          });
          res.status(200).json({
            user: user._id
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          errors = handleErrors(_context2.t0);
          res.status(400).json({
            errors: errors
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = {
  signup_get: signup_get,
  signup_post: signup_post,
  login_get: login_get,
  login_post: login_post
};