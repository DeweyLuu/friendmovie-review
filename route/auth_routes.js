var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

module.exports = function (router) {
	router.use(bodyParser.json());
	router.post('/login', function (req, res) {

		User.findOne({ logInName: req.body.logInName}, function (err, user) {
//			console.log("are we in here?",user.logInName);
			if(err) {
				res.status(500).json({msg: 'server error'});
			} else if (!user) {
				res.json({msg: "User does not exists"});
			} else if (user.comparePassword(req.body.password) === true) {
				var token = jwt.sign(user._id, process.env.secret, {expiresInMinutes: 120});
				res.json({
					success: true,
					msg: 'Authentication successful',
					token: token
				})
			} else {
				res.json({success: false, msg: 'Authentication failed. Password does not match'})
			}
		});
	})
}
