var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;


process.env.MONGO_URL = 'mongodb://localhost/moview_testDB';
 
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/friendmovie_review');

var apiRouter = express.Router ();
require('./route/user_router.js')(apiRouter);

app.use('/api', apiRouter);

app.listen(port, function() {
	console.log('server is on ' + port);
});

