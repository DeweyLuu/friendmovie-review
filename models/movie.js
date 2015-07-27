var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	title: {type: String, require: true},
	year: {type: Number, require: true},
	verification: title.split(' ').join().toLowerCase() + year.toString();
	genre: String
})

module.exports = mongoose.model('Movie', movieSchema);
