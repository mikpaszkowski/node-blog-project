const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//creating an instance of the express app
const app = express();

//connecting to the mondoDB base listening for requests on the port 3000
const mongodbURI = 'mongodb+srv://new-user_2020:someuser12345@nodedb.v4vhx.mongodb.net/note-db?retryWrites=true&w=majority';
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

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

//website routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'Blogs', blogs: result});
    })
    .catch((err) => {
        console.log(err);
    })
})




//redirect to /about from /about-us
app.get('/about-us', (req, res) => {

    res.redirect('/about');
})

app.get('/blog/add', (req, res) => {
    res.render('add', {title: 'Add Blog'});
})

app.post('/blogs', (req, res) => {
    //we can use the req.body only if we have use in our server
    //the express urlencoded function
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/:idNum', (req, res) => {
    const id = req.params.idNum;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            console.log(err);
        })
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        })

})

//default 404 page
app.use((req, res) => {
    res.status(404).render('404', {title : '404-Not Found'});
});