var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	categoryname: String,
	categoryslug: { type : String , unique : true, required : true, dropDups: true },
	categorydescription: String,
	views: {type: Number, default: 0},
	created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()},
    createdby:{type: String, default: 'Anonymous'},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});
CategorySchema.methods.addview = function(cb) {
  this.views += 1;
  this.save(cb);
};

CategorySchema.pre('remove', function(next) {
    // Middleware Remove all the Posts in the category
    this.model('Post').find( { category: this._id }, function(err, docs){
        for( var doc in docs){
            docs[doc].remove();
        }
    });	
	next();
});

mongoose.model('Category', CategorySchema);