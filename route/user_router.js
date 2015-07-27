var mongoose = require('mongoose'),
		Schema = mongoose.Schema;


var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user.js');
var Movie = require('../models/movie.js');

module.exports = function(router) {
	router.use(bodyParser.json());
	router.route('/users')
	.get(function(req, res) {})
	// index page, show all user names
	// Dewy
	
	
	router.route('/users/')
//	. auth(function(req, res) {})
	. post(function(req, res) {})
	// auth, let user signin and create new user
	// Conlan
	
	
	router.route('/users/:userId')
	.get(function(req, res) {})
	// pull information about a user, name and all movie
	// Dewy
	
	
	// create a new movie, save movie to db and insert id to user
	// Meng
	.post(function(req, res) {
		fetchUser(req, res, function(err, data) {
			var newMovie = new Movie({title: req.body.title, year:req.body.year, genre: req.body.genre});
			newMovie.save(function(err) {
				if(err) res.json(errorHandler(err)(500, 'save movie to database'));
				// check combination of title and year
				// check whether a movie exist
				else {
				
				}
			})
		})
	})

	
	
	router.route('/users/:userId/:movieId')
	.delete(function(req, res) {})
	// Meng
}

function fetchUser(req, res, callback) {
	User.findOne({name: req.params.userId})
	.populate('movies')
	.exec(function(err, user) { 
		if (err) {
			res.json(errorHandler(err)(500, 'retrieve user'));
		} 
		else if (!user) {
			res.json({msg: "User doesn't exist"})
		}
		else {
			callback(null, user);
		}
	})
}

							 
function errorHandler(error) {
	console.log(error);
	return function(statusCode, message){
		return ({status: statusCode, msg: "Server error. Couldn't " + message});
	}
}