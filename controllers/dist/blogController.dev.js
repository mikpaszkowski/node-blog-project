"use strict";

var Blog = require('../models/blog');

var moment = require('moment');

var categories = require('../resources/categories');

var _require = require('../routes/blogRoutes'),
    options = _require.options;

var blog_index = function blog_index(req, res) {
  Blog.find().sort({
    createdAt: -1
  }).then(function (result) {
    res.render('blogs/index', {
      title: 'Blogs',
      blogs: result,
      categories: categories
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

var blog_create_post = function blog_create_post(req, res) {
  //we can use the req.body only if we have use in our server
  //the express urlencoded function,
  req.body.date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  var blog = new Blog(req.body);
  blog.save().then(function (result) {
    res.redirect('/blogs');
  })["catch"](function (err) {
    console.log(err);
  });
};

var blog_create_get = function blog_create_get(req, res) {
  res.render('blogs/add', {
    title: 'Add Blog',
    categories: categories
  });
};

var blog_update_get = function blog_update_get(req, res) {
  Blog.findById(req.params.idNum).then(function (result) {
    res.render('blogs/update', {
      blog: result,
      title: 'Update'
    });
  })["catch"](function (err) {
    res.status(404).render('404', {
      title: 'Blog not found'
    });
  });
};

var blog_update_put = function blog_update_put(req, res) {
  req.body.date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  Blog.findByIdAndUpdate({
    _id: req.params.idPut
  }, {
    $set: req.body
  }, {
    "new": true
  }).then(function (result) {
    res.redirect('/blogs');
  })["catch"](function (err) {
    res.status(404).render('404', {
      title: 'Update failed'
    });
  });
};

var blog_details = function blog_details(req, res) {
  Blog.findById(req.params.idNum).then(function (result) {
    res.render('blogs/details', {
      blog: result,
      title: 'Blog Details'
    });
  })["catch"](function (err) {
    res.status(404).render('404', {
      title: 'Blog not found'
    });
  });
};

var blog_delete = function blog_delete(req, res) {
  Blog.findByIdAndDelete(req.params.id).then(function (result) {
    res.json({
      redirect: '/blogs'
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

module.exports = {
  blog_index: blog_index,
  blog_update_get: blog_update_get,
  blog_update_put: blog_update_put,
  blog_create_post: blog_create_post,
  blog_details: blog_details,
  blog_create_get: blog_create_get,
  blog_delete: blog_delete
};