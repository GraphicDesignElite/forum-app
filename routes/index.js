var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Forum Home' });
});

// Return All Posts
router.get('/posts', function(req, res, next) {
   Post.find(function(err, posts){
       if(err)return next(err)
       res.json(posts);
   });
});

// Create a post
router.post('/posts', function(req, res, next){
    var post = new Post(req.body);
    post.save(function(err, post){
       if(err) return next(err);
       
       res.json(post);
    });
});

// Return a single Post
router.get('/posts/:post', function(req, res) {
  res.json(req.post);
});

// Upvote a post
router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});

// Downvote a post
router.put('/posts/:post/downvote', function(req, res, next) {
  req.post.downvote(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});

// Delete a post
router.delete('/posts/delete/:post', function(req, res) {
    console.log("Deleting Post" + req.post._id);
    Post.findById(req.post._id)
        .exec(function(err, doc) {
            if (err || !doc) {
                res.statusCode = 404;
                res.send({});
            } else {
                doc.remove(function(err) {
                    if (err) {
                        res.statusCode = 403;
                        res.send(err);
                    } else {
                        res.send({});
                    }
                });
            }
        });
});



module.exports = router;
