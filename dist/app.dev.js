"use strict";

var express = require('express');

var morgan = require('morgan');

var mongoose = require('mongoose');

var Blog = require('./models/blog'); //creating an instance of the express app


var app = express(); //connecting to the mondoDB base listening for requests on the port 3000

var mongodbURI = 'mongodb+srv://new-user_2020:someuser12345@nodedb.v4vhx.mongodb.net/note-db?retryWrites=true&w=majority';
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (result) {
  return app.listen(3000);
})["catch"](function (err) {
  return console.log(err);
}); //registering view engine EJS (HTML template engine)

app.set('view engine', 'ejs'); // if the views directory is different then the default on - 'views'
//app.set('views', 'myviews');
//middleware & static files

app.use(express["static"]('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan('dev')); //requests

app.get('/', function (req, res) {
  res.redirect('/blogs');
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About'
  });
}); //website routes

app.get('/blogs', function (req, res) {
  Blog.find().sort({
    createdAt: -1
  }).then(function (result) {
    res.render('index', {
      title: 'Blogs',
      blogs: result
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); //redirect to /about from /about-us

app.get('/about-us', function (req, res) {
  res.redirect('/about');
});
app.get('/blog/add', function (req, res) {
  res.render('add', {
    title: 'Add Blog'
  });
});
app.post('/blogs', function (req, res) {
  //we can use the req.body only if we have use in our server
  //the express urlencoded function
  var blog = new Blog(req.body);
  blog.save().then(function (result) {
    res.redirect('/blogs');
  })["catch"](function (err) {
    console.log(err);
  });
});
app.get('/blogs/:idNum', function (req, res) {
  var id = req.params.idNum;
  Blog.findById(id).then(function (result) {
    res.render('details', {
      blog: result,
      title: 'Blog Details'
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
app["delete"]('/blogs/:id', function (req, res) {
  var id = req.params.id;
  Blog.findByIdAndDelete(id).then(function (result) {
    res.json({
      redirect: '/blogs'
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); //default 404 page

app.use(function (req, res) {
  res.status(404).render('404', {
    title: '404-Not Found'
  });
});