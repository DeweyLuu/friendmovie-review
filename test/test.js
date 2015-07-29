var chai = require('chai');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../models/user.js');
var	File = require('../models/movie.js');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var bodyParser = require('body-parser');

//process.env.secret = 'test secret';

chai.use(chaiHttp);

var globalToken;
var userId;

describe('http server', function(){
	
	before(function(done) {
		var user1 = new User({logInName : "Dewey", displayName : "Dewey", password : "1234", movies : [ ]});
		var user2 = new User({logInName : "Conlan", displayName : "Conlan", password : "1234", movies : [ ]});
		var user3 = new User({logInName : "Josh", displayName : "Josh", password : "1234", movies : [ ]});
		var user4 = new User({logInName : "Meng", displayName : "Meng", password : "1234", movies : [ ]});
		user1.save();
		user2.save();
		user3.save();
		user4.save();
		done();
	});
	
	after(function(done) {
		mongoose.connection.db.dropDatabase(function(err) {
			console.log('test database is dropped');
			done();
		});
	})
	
	describe('1. create new user and authentication, ', function(){
		it ('add a new user and save the hashed password', function(done) {
			chai.request('localhost:8080/api')
			.post('/users')
			.send({logInName : "TestUser", displayName : "Ahha", password : "1234", movies : [ ]})
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(JSON.parse(res.text)).deep.equal({msg: 'Added new user.'});
				User.findOne({logInName: 'TestUser'}, function(err, user) {
					expect(err).to.be.null;
					expect(user.password).not.equal('1234');
				})
				done();
			});
		});
	})
					 
	describe('2. login name needs to be unique, ', function(){
		it ('won\'t add duplicated user name', function(done) {
			chai.request('localhost:8080/api')
			.post('/users')
			.send({logInName : "Dewey", displayName : "Dew", password : "1234", movies : [ ]})
			.end(function (err, res) {
				expect(JSON.parse(res.text).msg).equal('Name already exists');
				done();
			});
		});
	})
		
	describe('3. Index page needs authentication, ', function(){
		it ('won\'t let user view all users without verification', function(done) {
			chai.request('localhost:8080/api')
			.get('/users')
			.end(function (err, res) {
				expect(res).to.have.status(403);
				done();
			});
		});	
	})

	describe('4. Login and authentication, ', function(){
		it ('let user signin and generates a token', function(done) {
			chai.request('localhost:8080/auth')
			.post('/login')
			.send({logInName : "TestUser", password : "1234"})
			.end(function (err, res) {
				expect(res.body.success).eql(true);
				expect(res.body.msg).equal('Authentication successful');
				expect(res.body.token).is.not.null;
				globalToken = res.body.token;
				done();
			});
		});	
	})
	
	
	describe('5. After token is generated for user, ', function(){
		before(function(done) {
			User.findOne({logInName: 'TestUser'}, function(err, user) {
				userId = user._id;
				done();
			})
		})
		
		describe('5.1 view all users, ', function(){
			it ('let user view all users if verified', function(done) {
				console.log(userId);
				console.log(globalToken);
				chai.request('localhost:8080/api')
				.get('/users/' + userId)
				.send({token: globalToken})
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.success).is.undefined;
					done();
				});
			});	
		})
		
	})

});