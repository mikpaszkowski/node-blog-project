const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth-routes');

//creating an instance of the express app
const app = express();

//connecting to the mondoDB base listening for requests on the port 3000
const mongodbURI = 'mongodb+srv://new-user_2020:someuser12345@nodedb.v4vhx.mongodb.net/note-db?retryWrites=true&w=majority';
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

//new-user123
//12345

//registering view engine EJS (HTML template engine)
app.set('view engine', 'ejs');

// if the views directory is different then the default on - 'views'
//app.set('views', 'myviews');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


//requests
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title : 'About'});
});


//redirect to /about from /about-us
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

app.use('/blogs', blogRoutes);
app.use(authRoutes); 


//default 404 page
app.use((req, res) => {
    res.status(404).render('404', {title : '404-Not Found'});
});