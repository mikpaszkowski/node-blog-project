"use strict";

var jwt = require('jsonwebtoken');

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

module.exports = {
  requireAuth: requireAuth
};