var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;


process.env.MONGO_URL = 'mongodb://localhost/moview_testDB';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/friendmovie_review');

var apiRouter = express.Router ();
require('./route/user_router.js')(apiRouter);

var authRouter = express.Router();
require('./route/auth_routes.js')(authRouter);

app.use('/api', require('./middlewares/verify.js'));
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.listen(port, function() {
	console.log('server is on ' + port);
});

