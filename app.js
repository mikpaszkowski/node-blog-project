const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParses = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

//creating an instance of the express app
const app = express();

//connecting to the mondoDB base listening for requests on the port 3000
const mongodbURI = 'mongodb+srv://new-user_2020:someuser12345@nodedb.v4vhx.mongodb.net/note-db?retryWrites=true&w=majority';
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3030))
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//registering view engine EJS (HTML template engine)
app.set('view engine', 'ejs');

// if the views directory is different then the default on - 'views'
//app.set('views', 'myviews');

//middleware & static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParses());


//requests
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/about', requireAuth, (req, res) => {
    res.render('about', {title : 'About'});
});


//redirect to /about from /about-us
app.get('/about-us', requireAuth, (req, res) => {
    res.redirect('/about');
});

app.get('*', checkUser);

app.use('/blogs', requireAuth, blogRoutes); 
app.use(authRoutes);


//default 404 page
app.use((req, res) => {
    res.status(404).render('404', {title : '404-Not Found'});
});