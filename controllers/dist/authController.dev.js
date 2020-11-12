"use strict";

var User = require('../models/user');

var handleErrors = function handleErrors(err) {
  console.log(err.message, err.code);
  var errors = {
    email: '',
    password: ''
  }; //error code of duplicate records

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

var signup_get = function signup_get(req, res) {
  res.render('signup', {
    title: 'Sing Up'
  });
};

var signup_post = function signup_post(req, res) {
  var _req$body, email, password, user, errors;

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
          _context.next = 7;
          return regeneratorRuntime.awrap(res.status(201).json(user));

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          errors = handleErrors(_context.t0);
          res.status(400).json({
            errors: errors
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

var login_get = function login_get(req, res) {
  res.render('login', {
    title: 'Log In'
  });
};

var login_post = function login_post(req, res) {
  var _req$body2, email, password, user, errors;

  return regeneratorRuntime.async(function login_post$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.create({
            email: email,
            password: password
          }));

        case 4:
          user = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(res.status(201).json(user));

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          errors = handleErrors(_context2.t0);
          res.status(400).json({
            errors: errors
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

module.exports = {
  signup_get: signup_get,
  signup_post: signup_post,
  login_get: login_get,
  login_post: login_post
};