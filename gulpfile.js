'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../dev/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('webpackdev', function() {
  return gulp.src('./dev/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

gulp.task('minify-css', function() {
  return gulp.src('./dev/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
    return gulp.src('dev/**/*.html')
    .pipe(gulp.dest('build/'))
    //.pipe(minifyHTML(opts))
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['copy', 'webpackdev', 'minify-css']);

// Back-End Tasks //

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
