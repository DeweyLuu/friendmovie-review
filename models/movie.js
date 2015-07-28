var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = mongoose.Schema({
	title: {type: String, required: true},
	year: {type: Number, required: true},
	verification: this.title.split(' ').join().toLowerCase() + this.year.toString(),
	genre: String
})

module.exports = mongoose.model('Movie', movieSchema);
