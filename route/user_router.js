var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var Movie = require('../models/movie.js');
//var verify = require('../middlewares/verify.js');

module.exports = function(router) {
	router.use(bodyParser.json());
	// router.route('/auth')
	// 	.post(function(req,res) {
	// 	})
	router.route('/')
		.get(function(req,res) {
			if(err) {
				return console.log(err);
			} else {
				res.json({msg:"hello"});
			}
		});

	router.route('/users')
	.get(function(req, res) {
		User.find({}, function(err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log(data);
				res.json(data);
			}
		});
	})
	// index page, show all user names

	router.route('/users/')
	//.auth
	.post(function(req, res) {
        User.findOne({logInName: req.body.logInName}, function(err, doc) {
            if(err) {
                console.log(err);
                res.json({msg: "Check username and password"});
            } else if (doc) {
                res.json({msg: 'Name already exists'});
            }    else {
                if (req.body.logInName && req.body.password) {

                var newUser = new User({
                    logInName: req.body.logInName,
                    displayName: req.body.displayName,
                    password: req.body.password,
                    movies: []
                });
                newUser.password = newUser.generateHash(newUser.password);
                newUser.save(function(err, data) {
                    if (err) {
                        console.log(err);
                    }
                    res.json({msg: 'Added new user.'});
                });
            } else {
                res.json({msg: "Check username and password"});
            }
            }
        })
    })
	// auth, let user signin and create new user

	router.route('/users/:userId')
	.get(function(req, res) {
		var person = req.params.userId;
		var NumMovies = 0;
		var Reviewarr = [];
		User.findById(person, function(err, user) {
			if (err) {
				console.log(err);
			} else if (!user) {
				return res.json({msg: "User not found"});
			} else {
				var total = user.movies.length;
				user.movies.forEach(function(aMovie) {
					var reviewInfo = {};
					reviewInfo.review = aMovie.review;
					reviewInfo.rating = aMovie.rating;
					Movie.findOne({_id: aMovie.movie}, function(err, data) {
						if(err) return res.json({msg: 'cannot find movie'});
						reviewInfo.title = data.title;
						reviewInfo.year = data.year;
						reviewInfo.genre = data.genre;
						console.log(reviewInfo);
						Reviewarr.push(reviewInfo);
						NumMovies++;
						if(NumMovies == total) {
							var userInfo = ({user: user, reviews: Reviewarr});
							console.log(userInfo);
							res.send(userInfo);
							return;
						}
					})
				})
			}
		})
	})
	// pull information about a user, name and all movie
};
