const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const BlogPost = require("../models/blogPost");
const Comment = require("../models/comment");

exports.comment_create_post = [
    body("text")
        .trim()
        .isLength({ min: 1 })
        .withMessage('text must not be blank')
        .escape(),
    body("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage('name must not be blank')
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const newComment = Comment({
      name: req.body.name,
      text: req.body.text,
      dateTime: Date.now(),
    });

    const response = {
        errors: errors.errors,
        comment: newComment,
        updatedBlogPost: {},
    }

    if (!errors.isEmpty()) {
      console.log('there are errors');
      res.send(response);
      return; //<---Not sure if this is neccessary
    } else {
        // Data from client is valid.
        try {
          const createdComment = await newComment.save();

          // Retrieve the blog post by its _id (replace 'your_blog_post_id' with the actual _id)
          const foundPost = await BlogPost.findById(req.params.postId);

          // Add the comment's _id to the blog post's 'comments' field
          foundPost.comments.push(createdComment._id);

          // Save the updated blog post
          const updatedBlogPost = await foundPost.save();

          console.log('Comment added to the blog post:', createdComment);
          response.updatedBlogPost = updatedBlogPost;
          res.send(response);

          } catch(err) {
            console.log("error saving comment to db");
            return next(err);
        }
    }
  }),
];