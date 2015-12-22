var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	categoryname: String,
	categoryslug: String,
	created: {type: Date, default: Date.now()},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

mongoose.model('Category', CategorySchema);