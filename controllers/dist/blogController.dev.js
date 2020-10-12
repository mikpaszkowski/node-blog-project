"use strict";

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
var Blog = require('../models/blog');

var blog_index = function blog_index(req, res) {
  Blog.find().sort({
    createdAt: -1
  }).then(function (result) {
    res.render('blogs/index', {
      title: 'Blogs',
      blogs: result
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

var blog_create_post = function blog_create_post(req, res) {
  //we can use the req.body only if we have use in our server
  //the express urlencoded function
  var blog = new Blog(req.body);
  blog.save().then(function (result) {
    res.redirect('/blogs');
  })["catch"](function (err) {
    console.log(err);
  });
};

var blog_details = function blog_details(req, res) {
  var id = req.params.idNum;
  Blog.findById(id).then(function (result) {
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

var blog_create_get = function blog_create_get(req, res) {
  res.render('blogs/add', {
    title: 'Add Blog'
  });
};

var blog_delete = function blog_delete(req, res) {
  var id = req.params.id;
  Blog.findByIdAndDelete(id).then(function (result) {
    res.json({
      redirect: '/blogs'
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

module.exports = {
  blog_index: blog_index,
  blog_create_post: blog_create_post,
  blog_details: blog_details,
  blog_create_get: blog_create_get,
  blog_delete: blog_delete
};