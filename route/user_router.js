var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var Movie = require('../models/movie.js');
var verify = require('../middlewares/verify.js');

module.exports = function(router) {
	router.use(bodyParser.json());
	// router.route('/auth')
	// 	.post(function(req,res) {
	// 	})
	router.route('/users')
	.get(verify, function(req, res) {
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
			} else if (doc) {
				res.json({msg: 'Name already exists'});
			}	else {
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
			}
		})
	})
	// auth, let user signin and create new user

	router.route('/users/:userId')
	.get(verify, function(req, res) {
		var person = req.params.userId;
		//var total = user.movies;
		//console.log(total);
		var NumMovies = 0;
		var Reviewarr = [];
		User.findOne({logInName: person})
			.populate('movies')
			.exec(function(err, user) {
				if (err) {
					return res.json({msg: 'User not found'});
				} else {
					var total = user.movies.length;
					user.movies.forEach(function(aMovie){
						Movie.findOne({_id: aMovie.movie}, function(err, data) {
							if(err) return res.json({msg:'can not find movie'});
							// data['review'] = aMovie.review;
							// console.log(aMovie.review);
							// data.rating = aMovie.rating;
							console.log(data);
							Reviewarr.push(data);
							NumMovies++;
							if(NumMovies === total) {
								var userInfo = {user:user, reviews:Reviewarr};
								console.log(userInfo);
								res.json(userInfo);
								return;
							}
						})
					})
				}
			})
	})
	// pull information about a user, name and all movie
};



