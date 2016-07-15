var mongoose = require('mongoose');

var ConfigSchema = new mongoose.Schema({
    systemRecordsID: {type: String, default: '1'},
	registeredUsers: {type: Number, default: 0},
    totalPosts: {type: Number, default: 0},
    totalComments: {type: Number, default: 0}
});

mongoose.model('Config', ConfigSchema);