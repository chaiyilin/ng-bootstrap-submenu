"use strict";

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require("gulp-rename");
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var config = {
	paths: {
		bootstrapSubmenuCss: './lib/bootstrap-submenu-2.0.1-dist/css/*.*',
		bootstrapSubmenuJs: './lib/bootstrap-submenu-2.0.1-dist/js/bootstrap-submenu.min.js',
		html: './src/*.html',
		js: './src/*.js',
		dist: './dist',
		temp: './temp'
	}
}

gulp.task('clean', function(){
    gulp.src([config.paths.temp, config.paths.dist], {read: false})
        .pipe(rimraf());
});

gulp.task('css', function() {
	gulp.src(config.paths.bootstrapSubmenuCss)
		.pipe(rename({
			prefix: "ng-"
		}))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(templateCache())
		.pipe(gulp.dest(config.paths.temp));
});

gulp.task('minjs', ['html'], function() {
	gulp.src([config.paths.js, config.paths.temp + '/*.js'])
	  	.pipe(jshint())
  		.pipe(jshint.reporter('default'))
  		.pipe(ngAnnotate())
		.pipe(concat('ng-bootstrap-submenu.min.js'))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('js', ['html'], function() {
	gulp.src([config.paths.js, config.paths.temp + '/*.js'])
	  	.pipe(jshint())
  		.pipe(jshint.reporter('default'))
  		.pipe(ngAnnotate())
		.pipe(concat('ng-bootstrap-submenu.js'))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('default', ['html', 'js', 'minjs', 'css']);