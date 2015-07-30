var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;

process.env.secret = process.env.secret || 'temporary';
//process.env.MONGO_URL = 'mongodb://localhost/moview_testDB';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/friendmovie_review');

var userRoute = express.Router();
var movieRoute = express.Router();
var authRoute = express.Router();

require('./route/auth_routes.js')(authRoute);
require('./route/user_router.js')(userRoute);
require('./route/movie_router.js')(movieRoute);

app.use('/auth', authRoute);
app.use('/api', userRoute);
app.use('/api', movieRoute);


app.listen(port, function() {
	console.log('server is on ' + port);
});

