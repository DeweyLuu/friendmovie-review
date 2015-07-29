var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('default', ['test', 'lint'], function() {});

gulp.task('test', function() {
	return gulp.src(['./test/*.js',
	'./route/*.js','./models/*.js','./middlewares/*.js'])
						 .pipe(mocha());
});

gulp.task('lint', function() {
	return gulp.src(['*.js','./test/*.js',
	'./route/*.js','./models/*.js','./middlewares/*.js'])
						 .pipe(jshint())
						 .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
	gulp.watch(['*.js','./test/*.js',
	'./route/*.js','./models/*.js','./middlewares/*.js'], ['default']);
});