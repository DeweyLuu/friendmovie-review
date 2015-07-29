var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	var secret = "\'" + process.env.secret + "\'";
	if (token) {
		jwt.verify(token, secret, function (err, decoded) {
			if(err) {
				res.json({success: false, message: 'Token authentication failed'});
			} else {
				req.decoded = decoded;
				next();
			}
		})
	} else {
		res.status(403).send({
			success: false,
			msg: 'No token given.'
		});
	}
}
//
