const express = require('express');

//creating an instance of the express app
const app = express();

//registering view engine EJS (HTML template engine)
app.set('view engine', 'ejs');

// if the views directory is different then the default on - 'views'
//app.set('views', 'myviews');


//listening for requests on the port 3000
app.listen(3000);

app.use((req, res, next) => {
    console.log('new request made: ');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

//requests
app.get('/', (req, res) => {
    
    blogs = [
        { title: "First blog", snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit"},
        { title: "Second blog", snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit"},
        { title: "Third blog", snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit"}
    ]

    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {

    res.render('about', {title : 'About'});
});


//redirect to /about from /about-us
app.get('/about-us', (req, res) => {

    res.redirect('/about');
})

app.get('/blog/add', (req, res) => {
    res.render('add', {title: 'Add Blog'});
})

//default 404 page
app.use((req, res) => {
    res.status(404).render('404', {title : '404-Not Found'});
});