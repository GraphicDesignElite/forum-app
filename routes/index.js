var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');

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
router.param('category', function(req, res, next, id) {
  var query = Category.findById(id);

  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error('can\'t find category')); }

    req.category = category;
    return next();
  });
});

/* GET Our Home Page. */
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
router.post('/posts/:category', function(req, res, next){
    var post = new Post(req.body);
    post.category = req.category;
    
    post.save(function(err, post){
       if(err) return next(err);
       
       // attempt to add post into category posts
        req.category.posts.push(post);
        req.category.save(function(err, category) {
        if(err){ return next(err); }
        res.json(post);
        });
    });
});
// Return a single Post
router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
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

// Add a new comment
router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }
      res.json(comment);
    });
  });
});
// Upvote a Comment
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});
// Downvote a Comment
router.put('/posts/:post/comments/:comment/downvote', function(req, res, next) {
  req.comment.downvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});



// Return All Categories
router.get('/categories', function(req, res, next) {
   Category.find(function(err, categories){
       if(err)return next(err)
       res.json(categories);
   });
});

// Return a single Category in the works
router.get('/categories/:category', function(req, res, next) {
  req.category.populate('posts', function(err, posts) {
    if (err) { return next(err); }
    res.json(posts);
  });
});

// Create a Category
router.post('/categories', function(req, res, next){
    var category = new Category(req.body);
    category.save(function(err, post){
       if(err) return next(err); 
       res.json(post);
    });
});
// Delete a category
router.delete('/categories/delete/:category', function(req, res) {
    console.log("Deleting Category" + req.category._id);
    Category.findById(req.category._id)
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
