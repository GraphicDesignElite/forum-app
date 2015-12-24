var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	categoryname: String,
	categoryslug: String,
	categorydescription: String,
	views: {type: Number, default: 0},
	created: {type: Date, default: Date.now()},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});
CategorySchema.methods.addview = function(cb) {
  this.views += 1;
  this.save(cb);
};

CategorySchema.pre('remove', function(next) {
    // Middleware Remove all the Posts in the category
    this.model('Post').remove( { category: this._id }, next );	
	
});

mongoose.model('Category', CategorySchema);