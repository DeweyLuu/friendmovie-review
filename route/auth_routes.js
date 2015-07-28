var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

module.exports = function (router) {

	router.post('/auth', function (req, res) {

		User.findOne({ name: req.body.name}, function (err, user) {
			if(err) {
				res.status(500).json({msg: 'server error'});
			} else if (User.comparePassword === true) {
				var token = jwt.sign(user, process.env.secret, {expiresInMinutes: 120});
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