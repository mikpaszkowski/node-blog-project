"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var requireAuth = function requireAuth(req, res, next) {
  var token = req.cookies.jwt; //jwt verification

  if (token) {
    jwt.verify(token, 'new user at my website', function (err, decodedToken) {
      if (err) {
        console.log(err.message);
        res.redirect('login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

var checkUser = function checkUser(req, res, next) {
  var token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'new user at my website', function _callee(err, decodedToken) {
      var user;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 6;
                break;
              }

              console.log(err.message);
              res.locals.user = null;
              next();
              _context.next = 13;
              break;

            case 6:
              console.log(decodedToken);
              _context.next = 9;
              return regeneratorRuntime.awrap(User.findById(decodedToken.id));

            case 9:
              user = _context.sent;
              res.locals.user = user;
              console.log('Middleware dude!');
              next();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  requireAuth: requireAuth,
  checkUser: checkUser
};