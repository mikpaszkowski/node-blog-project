const express = require('express');
const blogController = require('../controllers/blogController');


const router = express.Router();

//website routes
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/add', blogController.blog_create_get);
router.get('/:idNum', blogController.blog_details);
router.get('/update/:idNum', blogController.blog_update_get);
router.put('/update/:idNum', blogController.blog_update_put);
router.delete('/:id', blogController.blog_delete);

module.exports = router;