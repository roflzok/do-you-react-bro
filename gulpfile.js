#!/usr/bin/nodejs

/* global _: true */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bourbonPaths = require('node-bourbon').includePaths,
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    wrap = require('gulp-wrap'),
    $ = require('gulp-load-plugins')();



// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
// ------------ GULP CONNECT --------------
// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
gulp.task('connect', function() {
  connect.server();
});



// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
// ------------ GULP SASSY ----------------
// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
gulp.task('sassy', function () {
    return gulp.src(__dirname + '/app/sass/style.scss')
    .pipe($.plumber({ errorHandler: $.notify.onError("SASS compile has failed! <%= error %>") }))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        errLogtoConsole: true,
        includePaths: bourbonPaths
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(__dirname + '/app/css'))
    .pipe($.notify({'title': 'SASS good!', 'message': 'Do you even successful SASS build, bro?!'}));
});



// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
// ------------- GULP WRAP ----------------
// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
gulp.task('layout', function () {
  return gulp.src(['app/templates/**/*.html', '!app/templates/_base.html'])
    .pipe(wrap({src: 'app/templates/_base.html'}))
    .pipe(gulp.dest('./'))
    .pipe($.notify({'title': 'HTML good!', 'message': 'Do you even successful HTML build, bro?!'}));
});




// watch
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['app/sass/**'], ['sassy']).on('change', livereload.changed);
    gulp.watch(['app/*.js']).on('change', livereload.changed);
    gulp.watch(['app/templates/*.html'], ['layout']).on('change', livereload.changed);
    gulp.watch(['*.html']).on('change', livereload.changed);
    gulp.watch(['app/css/**']).on('change', livereload.changed);
});

// default
gulp.task('default', [
    'connect',
    'sassy',
    'layout',
    'watch'
]);