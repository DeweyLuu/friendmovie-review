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

userSchema.pre('save', function (next) {
	var user = this;

	//just a simple check to see if password is being created or modifed
	if(!user.isModified('password')) return next();

	//creating a random salt, 10 is the default value
	bcrypt.genSalt(10, function (err, salt) {
		if(err) {
			return console.log(err);
		} else {
			//hashing the password before the user is saved
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) {
					return next(err);
				} else {
					//when we get here the users password is swapped with our hash value
					user.password = hash;
					next();
				}
			});
		}
	});
});

userSchema.methods.comparePassword = function (enteredPass, cb) {
	//this is the method that will be used when authenticating the passwords
	bcrypt.compare(enteredPass, this.password, function (err, isMatch) {
		//isMatch will return true or false
		if(err) {
			return cb(err);
		} else {
			cb(null, isMatch);
		}
	})
}

module.exports = mongoose.model('User', userSchema);
