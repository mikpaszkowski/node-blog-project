"use strict";

var express = require('express');

var morgan = require('morgan');

var mongoose = require('mongoose');

var Blog = require('./models/blog');

var blogRoutes = require('./routes/blogRoutes');

var authRoutes = require('./routes/authRoutes');

var cookieParses = require('cookie-parser');

var _require = require('./middleware/authMiddleware'),
    requireAuth = _require.requireAuth,
    checkUser = _require.checkUser; //creating an instance of the express app


var app = express(); //connecting to the mondoDB base listening for requests on the port 3000

var mongodbURI = 'mongodb+srv://new-user_2020:someuser12345@nodedb.v4vhx.mongodb.net/note-db?retryWrites=true&w=majority';
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (result) {
  return app.listen(3030);
})["catch"](function (err) {
  return console.log(err);
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true); //registering view engine EJS (HTML template engine)

app.set('view engine', 'ejs'); // if the views directory is different then the default on - 'views'
//app.set('views', 'myviews');
//middleware & static files

app.use(express["static"]('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use(cookieParses()); //requests

app.get('/', function (req, res) {
  res.redirect('/login');
});
app.get('/about', requireAuth, function (req, res) {
  res.render('about', {
    title: 'About'
  });
}); //redirect to /about from /about-us

app.get('/about-us', requireAuth, function (req, res) {
  res.redirect('/about');
});
app.get('*', checkUser);
app.use('/blogs', requireAuth, blogRoutes);
app.use(authRoutes); //default 404 page

app.use(function (req, res) {
  res.status(404).render('404', {
    title: '404-Not Found'
  });
});