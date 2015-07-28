var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entended: false}));

// app.use(function(req, res, next) {
// 	console.log('token: ');
// 	console.log(req.query.token);
// 	next();
// })

process.env.secret = process.env.secret || 'temporary';
process.env.MONGO_URL = 'mongodb://localhost/moview_testDB';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/friendmovie_review');

var apiRouter = express.Router ();
require('./route/user_router.js')(apiRouter);

var authRouter = express.Router();
require('./route/auth_routes.js')(authRouter);


app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.listen(port, function() {
	console.log('server is on ' + port);
});

