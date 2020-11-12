const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    }

}, {timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);

