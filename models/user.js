var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


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

userSchema.methods.generateHash = function (password) {
return bcrypt.hashSync(password, 8, null)
}



userSchema.methods.comparePassword = function (enteredPass, cb) {
	//this is the method that will be used when authenticating the passwords
	return bcrypt.compareSync(enteredPass, this.password); 
		//isMatch will return true or false
		
}

module.exports = mongoose.model('User', userSchema);
