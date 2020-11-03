

const Blog = require('../models/blog');
const moment = require('moment');
const categories = require('../resources/categories');
const { options } = require('../routes/blogRoutes');




const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'Blogs', blogs: result, categories: categories });
        })
        .catch((err) => {
            console.log(err);
        })
};

const blog_create_post = (req, res) => {
    //we can use the req.body only if we have use in our server
    //the express urlencoded function,

    req.body.date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
};
const blog_create_get = (req, res) => {
    res.render('blogs/add', { title: 'Add Blog', categories: categories });
};

const blog_update_get = (req, res) => {
    Blog.findById(req.params.idNum)
        .then((result) => {
            res.render('blogs/update', { blog: result, title: 'Update' });
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
        })
}

const blog_update_put = (req, res) => {
    console.log(req.body);
    console.log('_id:' + req.params.idPut)
    Blog.findByIdAndUpdate({_id: req.params.idPut}, {$set: req.body}, {new: true})
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Update failed' });
        })
  
}

const blog_details = (req, res) => {
    Blog.findById(req.params.idNum)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
        })
};



const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        })
}


module.exports = {
    blog_index,
    blog_update_get,
    blog_update_put,
    blog_create_post,
    blog_details,
    blog_create_get,
    blog_delete,
}