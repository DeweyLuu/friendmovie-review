var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = mongoose.Schema({
	title: String,
	year: Number,
	genre: String
})

module.exports = mongoose.model('Movie', movieSchema);
