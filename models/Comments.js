var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	author: {type: String, default: 'Anonymous'},
	upvotes: {type: Number, default: 0},
	downvotes:{type: Number, default: 0},
	created: {type: Date, default: Date.now},
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
CommentSchema.methods.downvote = function(cb) {
  this.downvotes += 1;
  this.save(cb);
};
mongoose.model('Comment', CommentSchema);