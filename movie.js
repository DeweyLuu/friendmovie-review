var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	title: String,
	year: Number,
	genre: String
})

module.exports = mongoose.model('Movie', movieSchema);
