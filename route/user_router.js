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
	
	.post(function(req, res) {})
	// create a new movie, save movie to db and insert id to user
	// Meng
	
	
	router.route('/users/:userId/:movieId')
	.delete(function(req, res) {})
	// Meng
}