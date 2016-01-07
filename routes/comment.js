var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');


// Route Parameters
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});

// Add a new comment
router.post('/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  if(req.post.active && comment.body.length > 1){
    comment.save(function(err, comment){
        if(err){ return next(err); }
   
        req.post.comments.push(comment);
        req.post.save(function(err, post) {
        if(err){ return next(err); }
        res.json(comment);
        });
    });
  }
  else{
      var err = ("Failed. The Post Is Inactive.")
      res.send(err);
      return next(err);
  }
});

// Upvote a Comment
router.put('/upvote/:comment', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});
// Downvote a Comment
router.put('/downvote/:comment', function(req, res, next) {
  req.comment.downvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});


module.exports = router;