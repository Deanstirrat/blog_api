const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const BlogPost = require("../models/blogPost");
const Comment = require("../models/comment");

//get all posts
exports.blog_posts_get = asyncHandler(async(req, res, next) => {
  const blogPostsRetreived = await BlogPost.find().populate("comments").sort({ dateTime: -1 }).limit(10);

  console.log("got here");
  
  const blogPosts = [];

  for(post of blogPostsRetreived){
    const newPost = {
        title: post.title,
        text: post.text,
        comments: post.comments.map(comment => ({
          ...comment,
          dateTime: Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short'}).format(comment.dateTime),
        })),
        dateTime: Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short'}).format(post.dateTime),
    }
    blogPosts.push(newPost);
  }

  res.send(blogPosts);
});

//get single post by id
exports.blog_post_get = asyncHandler(async(req, res, next) => {
  const blogPost = await BlogPost.findById(req.params.postId).populate("comments");

  const transformedPost = {
      title: blogPost.title,
      text: blogPost.text,
      comments: blogPost.comments.map(comment => ({
        ...comment,
        dateTime: Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short'}).format(comment.dateTime),
      })),
      dateTime: Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short'}).format(blogPost.dateTime),
  }

  res.send(transformedPost);
});

//create new post
exports.blog_post_create_post = asyncHandler(async (req, res, next) => {

  console.log(req.body);

  const newBlogPost = BlogPost({
    title: req.body.title,
    text: req.body.text,
    comments: [],
    dateTime: Date.now(),
  });

  try {
  const result = await newBlogPost.save();
  res.send(result);
  } catch(err) {
      console.log("error saving new blog post to db");
      return next(err);
  };
});