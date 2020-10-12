"use strict";

var express = require('express');

var blogController = require('../controllers/blogController');

var router = express.Router(); //website routes

router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/add', blogController.blog_create_get);
router.get('/:idNum', blogController.blog_details);
router["delete"]('/:id', blogController.blog_delete);
module.exports = router;