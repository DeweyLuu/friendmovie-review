var chai = require('chai');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../models/user.js');
var	Movie = require('../models/movie.js');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var bodyParser = require('body-parser');


process.env.secret = 'test secret';

chai.use(chaiHttp);

var globalToken;
var userId;
var reviewId;

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

//	after(function(done) {
//		mongoose.connection.db.dropDatabase(function(err) {
//			console.log('test database is dropped');
//			done();
//		});
//	})
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

//	describe('3. Index page needs authentication, ', function(){
//		it ('won\'t let user view all users without verification', function(done) {
//			chai.request('localhost:8080/api')
//			.get('/users')
//			.end(function (err, res) {
//				expect(res).to.have.status(403);
//				done();
//			});
//		});
//	})
	describe('3. Index page does not need authentication, ', function(){
		it ('let user view all users without verification', function(done) {
			chai.request('localhost:8080/api')
			.get('/users')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res.body).not.null;
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
	

//		describe('5.1 view all users, ', function(){
//			it ('let user view all users if verified', function(done) {
////				console.log(userId);
////				console.log(globalToken);
//				chai.request('localhost:8080/api')
//				.get('/users')
//				.send({token: globalToken})
//				.end(function (err, res) {
//					expect(err).to.be.null;
//					expect(res.body.success).is.undefined;
//					done();
//				});
//			});
//		})

		describe('5.2 view one user', function() {
			it('should let us view the specific user if we\'re verified', function(done) {
				chai.request('localhost:8080/api')
				.get('/users/user' )
				.send({token: globalToken})
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.success).is.undefined;
					expect(res.body).have.property('user');
					expect(res.body).have.property('reviews');
					done();
				})
			})
		})
	})
})

	describe('6. After token is generated for user, ', function(){
		it ('user can create movie review if a movie is valid', function(done) {
			chai.request('localhost:8080/api')
			.post('/users/review')
			.send({token: globalToken})
			.send({title: 'Thorn', year: '2008', genre: 'advanture', review: 'I love it', rating: '4.5'})
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res.body.msg).equal('Movie review was added.');
				done();
			});
		});
	})

		describe('6.2 if the movie is invalid, ', function(){
			it ('user can not create movie review.', function(done) {
				chai.request('localhost:8080/api')
				.post('/users/review')
				.send({token: globalToken})
				.send({title: 'Thorn', year: '2000', genre: 'advanture', review: 'I love it', rating: '4.5'})
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res.body.msg).equal('The movie does not exist. Please check movie titile and year of release.');
					done();
					});
				});
			})

		describe('6.3 if the movie is valid but already in database, ', function(){
			it ('user can create movie review. No new movie entry will be created', function(done) {
				chai.request('localhost:8080/api')
				.post('/users/review' )
				.send({token: globalToken})
				.send({title: 'Thorn', year: '2008', genre: 'advanture', review: 'I hate it', rating: '1'})
				.end(function (err, res) {
					Movie.find({verification: 'thorn2008'}, function(err, movie) {
						expect(err).to.be.null;
						expect(movie.length).equal(1);
					})
					expect(err).to.be.null;
					expect(res.body.msg).equal('Movie review was added.');
					done();
					});
				});
			})


//		describe('7. Delete a review that is inside of a users movie array', function() {
//			before(function(done) {
//				User.findOne({_id: userId}, function(err, user) {
//	//				console.log("user findone returning a user",user.movies[0]._id);
//					reviewId = user.movies[0]._id;
//					// reviewId = user.movies[0]._id;
//	//				console.log('should have a reviewId',reviewId);
//					done();
//				})
//			})

			describe('delete review', function() {
				it('should delete a review if user is valid', function(done) {
	//				console.log("review id should be here",reviewId)
					chai.request('localhost:8080/api')
					.delete('/users/user/' + reviewId)
					.send({token: globalToken})
					.end(function (err, res) {
						expect(err).to.be.null;
						expect(res.body.msg).to.eql('The review has been deleted');
						done();
					})
				})
			})

//		})