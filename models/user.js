var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	logInName: {type: String, unique: true},
	displayName: String,
	password: String,
	movies: [{
		movie: Schema.Types.ObjectId,
		review: String,
		rating: Number
	}]
});

module.exports = mongoose.model('User', userSchema);
