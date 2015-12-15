var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	categoryname: String,
	categoryslug: String,
	created: {type: Date, default: Date.now()}
});

mongoose.model('Category', CategorySchema);