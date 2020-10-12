// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const Blog = require('../models/blog');


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        })
};

const blog_create_post = (req, res) => {
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
};

const blog_details = (req, res) => {
    const id = req.params.idNum;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
        })
};

const blog_create_get = (req, res) => {
    res.render('blogs/add', { title: 'Add Blog' });
};

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        })
}


module.exports = {
    blog_index,
    blog_create_post,
    blog_details,
    blog_create_get,
    blog_delete
}