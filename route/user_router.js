var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user.js');
var Movie = require('../models/movie.js');

module.exports = function(router) {
	router.use(bodyParser.json());
	router.route('/users')
	.get(function(req, res) {
		Movie.find({}, function(err, data) {
			if (err) {
				console.log(err);
			} else {
				res.json(data);
			}
		});
	})
	// index page, show all user names

/*
	router.route('/users/')
	.auth
	. post
	// auth, let user signin and create new user
*/

	router.route('/users/:userId')
	.get(function(req, res) {
		var person = req.params.userId;
		User.findOne({logInName: person}, function(err, data) {
			if (err) {
				res.json({msg: 'User not found'});
			} else {
				console.log(data);
				res.json({msg: 'Found user'});
			}
		})
	})
	// pull information about a user, name and all movie
	/*
	.post
	// create a new movie, save movie to db and insert id to user

	router.route('/users/:userId/:movieId')
	.delete
	*/
};
