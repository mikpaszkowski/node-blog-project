"use strict";

var signup_get = function signup_get(req, res) {
  res.render('signup', {
    title: 'Sing Up'
  });
};

var signup_post = function signup_post(req, res) {
  res.send('signup');
};

var login_get = function login_get(req, res) {
  res.render('login', {
    title: 'Log In'
  });
};

var login_post = function login_post(req, res) {
  res.send('login');
};

module.exports = {
  signup_get: signup_get,
  signup_post: signup_post,
  login_get: login_get,
  login_post: login_post
};