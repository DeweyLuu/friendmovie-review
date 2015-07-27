var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	logInName: String,
	displayName: String,
	password: String,
	movies: [{
		movie: Schema.Types.ObjectId,
		review: String,
		rating: Number
	}]
});

module.exports = mongoose.model('User', userSchema);
