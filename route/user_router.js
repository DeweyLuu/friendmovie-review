var mongoose = require('mongoose'),
		Schema = mongoose.Schema;


var express = require('express');
var bodyParser = require('body-parser');
var User = require('../model/user.js');
var Movie = require('../model/movie.js');

module.exports = function(router) {
	router.use(bodyParser.json());
	router.route('/users')
	.get(function(req, res) {})
	// index page, show all user names
	
	
	router.route('/users/')
	.auth
	. post
	// auth, let user signin and create new user
	
	
	router.route('/users/:userId')
	.get
	// pull information about a user, name and all movie
	
	.post
	// create a new movie, save movie to db and insert id to user
	
	router.route('/users/:userId/:movieId')
	.delete
	