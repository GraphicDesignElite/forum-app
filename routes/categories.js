var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');


// Route Parameters
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


// Return All Categories
router.get('/', function(req, res, next) {
   Category.find(function(err, categories){
       if(err)return next(err)
       res.json(categories);
   });
});

// Return a single Category by id
router.get('/:category', function(req, res, next) {
  req.category.addview(function(err, post){
    if (err) { return next(err); }
  });
  
  req.category.populate('posts', function(err, posts) {
    if (err) { return next(err); }
    res.json(posts);
  });
});

// Return a single Category by slug value
router.get('/view/:categoryslug', function(req, res, next) {
  req.categoryslug.addview(function(err, post){
    if (err) { return next(err); }
  });
  
  req.categoryslug.populate('posts', function(err, posts) {
    if (err) { return next(err); }
    res.json(posts);
  });
});

// Create a Category
router.post('/', function(req, res, next){
    var category = new Category(req.body);
    category.save(function(err, category){
       if(err){
            return next(err);
       }
       res.json(category);
    });
});

// Delete a category
router.delete('/delete/:category', function(req, res) {
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
