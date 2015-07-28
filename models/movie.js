var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
	title: {type: String, required: true},
	year: {type: Number, required: true},

	verification: {type: String, unique: true},

	genre: String
});

module.exports = mongoose.model('Movie', movieSchema);




