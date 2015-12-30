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




/* Main Page and Bootstrap with Angular. */
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
// Get a single Post
router.get('/posts/:post', function(req, res, next) {
  req.post.addview(function(err, post){
    if (err) { return next(err); }
  });  
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

// Upvote a post
router.put('/post/upvote/:post', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});
// Downvote a post
router.put('/post/downvote/:post', function(req, res, next) {
  req.post.downvote(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});

// Close a post
router.put('/post/close/:post', function(req, res, next) {
  req.post.close(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});
// Open a post
router.put('/post/open/:post', function(req, res, next) {
  req.post.open(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});
// Delete a post
router.delete('/post/delete/:post', function(req, res) {
    console.log("Deleting Post with ID: " + req.post._id);  
    Post.findById(req.post._id)
        .exec(function(err, doc) {
            if (err || !doc) {
                res.statusCode = 404;
                res.send({});
            } else {
                console.log(doc.title);
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
// Edit a post
router.post('/post/edit/:post/:category', function(req, res, next){
    var oldCategory = req.category;
    var conditions = { _id: req.post._id };
    var options = {new: true};
    var update = {
        title: req.body.title,
        postcontent: req.body.postcontent,
        category: req.body.category
    };
    Post.findOneAndUpdate(conditions, update, options, function(err, doc){
        if (err){return err;} 
    });
    // Change Category if needed
    if(oldCategory != req.body.category){
        Category.findByIdAndUpdate(oldCategory, {$pull : {posts: req.post._id}}, {new:true}, 
            function(err, model) {
                 if (err){return err;} 
            });
        Category.findByIdAndUpdate(req.body.category, {$push : {posts: req.post._id}},{new:true}, 
            function(err, model) {
                 if (err){return err;} 
            });         
    }
    res.send("succesfully saved"); 
});

// Add a new comment
router.post('/post/:post/comments', function(req, res, next) {
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
router.put('/comment/upvote/:comment', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Downvote a Comment
router.put('/comment/downvote/:comment', function(req, res, next) {
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

// Return a single Category
router.get('/categories/:category', function(req, res, next) {
  /* Add a view for each user visit */
  req.category.addview(function(err, post){
    if (err) { return next(err); }
  });
  
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
    console.log("Deleting Category with ID: " + req.category._id);
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
