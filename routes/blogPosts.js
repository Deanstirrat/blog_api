var express = require('express');
var router = express.Router();
const Blog_Post_Controller = require('../controllers/blogPostController');
const Comment_Controller = require('../controllers/commentController');

//Get all posts
router.get('/', Blog_Post_Controller.blog_posts_get);

//Create a post
router.post('/', Blog_Post_Controller.blog_post_create_post)

//Get one post
router.get('/:postId', Blog_Post_Controller.blog_post_get);

//Create a comment
router.post('/:postId/comments', Comment_Controller.comment_create_post)


module.exports = router;
