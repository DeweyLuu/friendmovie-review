var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user.js');
var Movie = require('../models/movie.js');

var request = require('request');

//var verify = require('../middlewares/verify.js');


module.exports = function(router) {

router.route('/users/review')
	// create a new movie, save movie to db and insert id to user
	// Meng
	.post(verify, function(req, res) {
		fetchUser(req, res, function(user) {
			var rating = parseFloat(req.body.rating).toFixed(1);
			var year = parseInt(req.body.year, 10);
			if (isNaN(rating)) return res.json({msg: 'Rating is not valid.'});
			if (isNaN(year)) return res.json({msg: 'Year is not valid.'});

			var verif = req.body.title.split(' ').join().toLowerCase() + year.toString();
			var newMovie = new Movie({title: req.body.title, year: year, verification: verif, genre: req.body.genre});

			var userReview = {
				movie: null,
				review: req.body.review,
				rating: rating
			};

			fetchMovieVerif(newMovie, function(movie) {
				// validate that the movie exists in db. Assume that if it already exists it passed omdb validation
				if(movie) {
					// if movie already exists in db
					userReview.movie = movie._id;
					saveReview(res, user, userReview);
				}
				else {
					// if movie doesn't exist in db, create a new movie
					var next = function() {
					newMovie.save(function(err) {
						if(err) res.json(errorHandler(err)(500, 'save movie to database.'));
						else {
							userReview.movie = newMovie._id;
							saveReview(res, user, userReview);
							}
						})
					};
					// validate that the new movie against omdb
					validateMovie(req, res, newMovie, next);
				}
			});
		})
	})


	// user deletes a review, never delete movie
	router.route('/users/user/:reviewId')
	.delete(verify, function(req, res) {
		fetchUser(req, res, function(user) {
			var reviewExist = false;
			for (var i = 0; i < user.movies.length; i++ ) {
				var curr = user.movies[i];
				if (curr._id == req.params.reviewId) {
					reviewExist = true;
					user.movies.splice(i, 1);
					user.save(function(err) {
						if(err) return res.json(errorHandler(err)(500, 'retrieve user.'));
						res.json({msg: 'The review has been deleted'});
					});
					break;
				}
			}
			if(!reviewExist) {
				res.json({msg: 'The review doesn\'t exist'});
			}
		})
	})
};

function errorHandler(error) {
	console.log(error);
	return function(statusCode, message){
		return ({status: statusCode, msg: "Server error. Couldn't " + message});
	}
};

function fetchUser(req, res, callback) {
//	User.find({}, function(err, data) {console.log(data)});
	User.findById(req.decoded)
	.populate('movies')
	.exec(function(err, user) {
		if (err) {
			res.json(errorHandler(err)(500, 'retrieve user.'));
		}
		else if (!user) {
			res.json({msg: "User doesn't exist."})
		}
		else {
			callback(user);
		}
	})
}

function fetchMovieVerif(newMovie, callback) {
	var verif = newMovie.verification;
	Movie.findOne({verification: verif})
	.exec(function(err, movie) {
		if (err) {
			res.json(errorHandler(err)(500, 'create movie.'));
		}
		else {
			callback(movie);
		}
	})
}


function validateMovie(req, res, newMovie, next) {
//	newMovie = new Movie({title: req.body.title, year: req.body.year, verification: verify, genre: req.body.genre});
	var title = newMovie.title.toLowerCase().split(' ').join('+');
	var omdbUrl = 'http://www.omdbapi.com/?t=' + title + '&y=' + newMovie.year + '&plot=short&r=json';
	request(omdbUrl, function (error, response, body) {
		if (error) {
			res.json({msg: 'Could not validate movie.'});
			return;
		}
		else {
			var result = JSON.parse(body);
			// invalid movie will look like {"Response":"False","Error":"Movie not found!"}
			if (result.Error === 'Movie not found!') {
				console.log(result);
				res.json({msg: 'The movie does not exist. Please check movie titile and year of release.'});
				return;
			}
			else {
				console.log('the movie is valid');
				next();
			}
		}
	})
}

function saveReview(res, user, userReview){
	user.movies.push(userReview);
	user.save(function(err) {
		if(err) return res.json(errorHandler(err)(500, 'save movie to user.'));
		res.json({msg: 'Movie review was added.'});
	})
}
