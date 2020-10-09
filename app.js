const express = require('express');

//creating an instance of the express app
const app = express();

//registering view engine EJS (HTML template engine)
app.set('view engine', 'ejs');

// if the views directory is different then the default on - 'views'
//app.set('views', 'myviews');


//listening for requests on the port 3000
app.listen(3000);

//requests
app.get('/', (req, res) => {

    res.render('index');
});

app.get('/about', (req, res) => {

    res.sendFile('./views/about.html', {root: __dirname});
});


//redirect to /about from /about-us
app.get('/about-us', (req, res) => {

    res.redirect('/about');
})

//default 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});