'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../dev/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('webpackdev', function() {
  return gulp.src('./dev/js/**.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

gulp.task('minify-css', function() {
  return gulp.src('./dev/CSS/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/CSS/'));
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
gulp.task('default', ['build']);
