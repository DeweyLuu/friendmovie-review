var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, process.env.secret, function (err, decoded) {
			if(err) {
				res.json({success: false, message: 'Token authentication failed'});
			} else {
				console.log("verified token");
				req.decoded = decoded;
//				console.log(req.decoded);
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