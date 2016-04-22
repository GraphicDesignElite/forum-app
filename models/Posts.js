var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	postcontent: String,
	author: {type: String, default: 'Anonymous'},
	upvotes: {type: Number, default: 0},
	downvotes: {type: Number, default: 0},
	created: {type: Date, default: Date.now},
	views: Number,
	active: {type: Boolean, default: true},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
PostSchema.methods.downvote = function(cb) {
  this.downvotes += 1;
  this.save(cb);
};
PostSchema.methods.addview = function(cb) {
  this.views += 1;
  this.save(cb);
};
PostSchema.methods.close = function(cb) {
  this.active = false;
  this.save(cb);
};
PostSchema.methods.open = function(cb) {
  this.active = true;
  this.save(cb);
};

PostSchema.pre('remove', function(next) {
    // Remove all the comments associated with the removed post
    this.model('Comment').remove( { post: this._id }, next )
    
    // Middleware Remove all the category references to the removed post
    this.model('Category').update({ posts: this._id },
    { $pull: { posts: { $in: [this._id] }} } , next);
});


mongoose.model('Post', PostSchema);