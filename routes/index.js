var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');
var User = mongoose.model('User');
var Config = mongoose.model('Config');

var auth = jwt({secret: '2455645364365676gdfsggfdsgs', userProperty: 'payload'});
//process.env.DB_SECRET

// Route Parameters ----------------------------------------------------------- 
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
router.param('categoryslug', function(req, res, next, slug) {
  var query = Category.findOne({'categoryslug': slug});
  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error('can\'t find category slug')); }
    req.categoryslug = category;
    return next();
  });
});
router.param('user', function(req, res, next, username) {
  var query = User.findOne({'username': username});
  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user = user;
    return next();
  });
});



// Main Page and Bootstrap with Angular ----------------------------------- 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Forum Home' });
});


// Posts Routes ----------------------------------------------------------- 
    // Return All Posts
    router.get('/api/posts/', function(req, res, next) {
        Post.find(function(err, posts){
            if(err)return next(err)
            res.json(posts);
        });
    });
    // Create a post
    router.post('/api/posts/:category', auth, function(req, res, next){
        var post = new Post(req.body);
        // increment user post count
        User.findOne({ 'username': req.body.author }, function (err, user) {
            if (err) return handleError(err);
                user.addpost(user);
                user.posts.push(post);
        });
        
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
    router.get('/api/posts/:post', function(req, res, next) {
        req.post.addview(function(err, post){
            if (err) { return next(err); }
        });  
        req.post.populate('comments', function(err, post) {
            if (err) { return next(err); }
            res.json(post);
        });
    });
    // Upvote a post
    router.put('/api/posts/upvote/:post', auth, function(req, res, next) {
        req.post.upvote(function(err, post){
            if (err) { return next(err); }
            res.json(post);
        });
    });
    // Downvote a post
    router.put('/api/posts/downvote/:post', auth, function(req, res, next) {
        req.post.downvote(function(err, post){
            if (err) { return next(err); }
            res.json(post);
        });
    });
    // Close a post
    router.put('/api/posts/close/:post', auth, function(req, res, next) {

        req.post.close(function(err, post){
            if (err) { return next(err); }
            res.json(post);
        });
    });
    // Open a post
    router.put('/api/posts/open/:post', auth, function(req, res, next) {
        req.post.open(function(err, post){
            if (err) { return next(err); }
            res.json(post);
        });
    });
    // Delete a post
    router.delete('/api/posts/delete/:post', auth, function(req, res) {
        console.log("Deleting Post with ID: " + req.post._id);  
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
    // Edit a post
    router.post('/api/posts/edit/:post/:category', auth, function(req, res, next){
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

// Comment Routes ----------------------------------------------------------------- 
    // Add a new comment
    router.post('/api/comments/:post/comments', auth, function(req, res, next) { 
        var comment = new Comment(req.body);
        comment.post = req.post;
        if(req.post.active && comment.body.length > 1){
            
            // save the new comment
            comment.save(function(err, comment){
                if(err){ return next(err); }
        
                req.post.comments.push(comment);
                req.post.save(function(err, post) {
                if(err){ return next(err); }
                
                res.json(comment);
                });
            });
            // increment user comment count
            User.findOne({ 'username': comment.author }, function (err, user) {
                if (err) return handleError(err);
                    // user gets 1 comment tally and comment reference
                    user.addcomment(user);
                    user.comments.push(comment);
            });
        }
        else{
            var err = ("Failed. The Post Is Inactive.")
            res.send(err);
            return next(err);
        }
    });
    // Upvote a Comment
    router.put('/api/comments/upvote/:comment', auth, function(req, res, next) {
        req.comment.upvote(function(err, comment){
            if (err) { return next(err); }
            res.json(comment);
        });
    });
    // Downvote a Comment 
    router.put('/api/comments/downvote/:comment', auth, function(req, res, next) {
        req.comment.downvote(function(err, comment){
            if (err) { return next(err); }
            res.json(comment);
        });
    });


// Categories Routes ---------------------------------------------------------------

    // Return All Categories
    router.get('/api/categories/', function(req, res, next) {
        Category.find(function(err, categories){
            if(err)return next(err)
            res.json(categories);
        });
    });

    // Return a single Category by id
    router.get('/api/categories/:category', function(req, res, next) {
        req.category.addview(function(err, post){
            if (err) { return next(err); }
        });
        
        req.category.populate('posts', function(err, posts) {
            if (err) { return next(err); }
            res.json(posts);
        });
    });

    // Return a single Category by slug value
    router.get('/api/categories/view/:categoryslug', function(req, res, next) {
        req.categoryslug.addview(function(err, post){
            if (err) { return next(err); }
        });
        
        req.categoryslug.populate('posts', function(err, posts) {
            if (err) { return next(err); }
            res.json(posts);
        });
    });

    // Create a Category
    router.post('/api/categories/', auth, function(req, res, next){
        var category = new Category(req.body);
        category.save(function(err, category){
        if(err){
                return next(err);
        }
        res.json(category);
        });
    });

    // Delete a category
    router.delete('/api/categories/delete/:category', auth, function(req, res) {
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

// Comments Routes -----------------------------------------------------------------
    // Add a new comment
    router.post('/api/comment/:post/comments', auth, function(req, res, next) { 
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
    router.put('/api/comment/upvote/:comment', auth, function(req, res, next) {
    req.comment.upvote(function(err, comment){
        if (err) { return next(err); }
        res.json(comment);
    });
    });
    // Downvote a Comment
    router.put('/api/comment/downvote/:comment', auth, function(req, res, next) {
    req.comment.downvote(function(err, comment){
        if (err) { return next(err); }
        res.json(comment);
    });
    });

// User Registration Routes -----------------------------------------------------------------
    // Get user profile
    router.get('/api/users/:user', function(req, res, next) {
        var user = {}
        user.username = req.user.username;
        user.email = req.user.email;
        user.numcomments = req.user.numcomments;
        user.numposts = req.user.numposts;
        user.accountcreated = req.user.accountcreated;
        user.recentactivity = req.user.recentactivity;
        req.user.populate('posts', function(err, user) {
            if (err) { return next(err); }
                req.user.populate('comments', function(err, user) {
                if (err) { return next(err); }
                res.json(user);
            });
        });
        
       
    });
    
    // Register New User
    router.post('/api/register', function(req, res, next) {
        if(!req.body.username || !req.body.password || !req.body.email || !req.body.confirmpassword){
            return res.status(400).json({message:"Please fill out all fields"});
        }
        var user = new User();
        user.username = req.body.username;
        user.setPassword(req.body.password);
        user.email =  req.body.email;
        
        Config.findOne( {systemRecordsID : '1'}, function (err, result) {
            if (err) {return next(err)};
            if (!result) {
                console.log('The first user created in the system is designated as an admin. Creating admin now.');
                user.userrole = 'Admin';

                user.save(function(err){
                    if(err){return next(err)}
                    
                    return res.json({token: user.generateJWT()});
                });
                var config = new Config();
                config.registeredUsers = 1;
                config.save(function(err){
                    if(err){return next(err)}
                });

            }
            else{
                console.log('A new user has been created.');
                user.save(function(err){
                    if(err){return next(err)}
                    
                    return res.json({token: user.generateJWT()});
                });
            }
        });

    });
    //Log In User
    router.post('/api/login', function(req, res, next){
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message: 'Please fill out all fields'});
        }

        passport.authenticate('local', function(err, user, info){
            if(err){ return next(err); }

            if(user){
            return res.json({token: user.generateJWT( )});
            } else {
            return res.status(401).json(info);
            }
        })(req, res, next);
    });
    
    router.get('/*', function(req, res) {
    // AJAX requests are aren't expected to be redirected to the AngularJS app
    if (req.xhr) {
        return res.status(404).send(req.url + ' not found');
    }

    // `sendfile` requires the safe, resolved path to your AngularJS app
    res.render('index', { title: 'Forum Home' });
    });
    
module.exports = router;
