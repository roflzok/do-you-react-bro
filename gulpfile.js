#!/usr/bin/nodejs

/* global _: true */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bourbonPaths = require('node-bourbon').includePaths,
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    wrap = require('gulp-wrap'),
    del = require('del'),
    $ = require('gulp-load-plugins')();



// ----------------------------------------
// ----------------------------------------
// ------- SET US UP TEH PATH VARS --------
// ----------------------------------------
// ----------------------------------------

module.exports = {

  'scripts': {
    'src': './app/js/**/*.js',
    'dest': './build/js/'
  },

  'images': {
    'src': './app/images/**/*.{jpeg,jpg,png}',
    'dest': './build/images/'
  },
  
  'styles': {
    'src': './app/styles/**/*.scss',
    'dest': './build/css/'
  },
  
  'sourceDir': './app/',
  
  'buildDir': './build/'

}

var sourceDir = './app/',
    buildDir = './build/';





// ----------------------------------------
// ----------------------------------------
// ------------ GULP CONNECT --------------
// ----------------------------------------
// ----------------------------------------

gulp.task('connect', function() {
  // connect.server({
  //   root: 'build',
  //   livereload: true
  // });
  connect.server();
});





// ----------------------------------------
// ----------------------------------------
// ------------ GULP SASSY ----------------
// ----------------------------------------
// ----------------------------------------

gulp.task('sassy', function () {
    return gulp.src(sourceDir + 'sass/main.scss')
    .pipe($.plumber({ errorHandler: $.notify.onError("SASS compile has failed! <%= error %>") }))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        errLogtoConsole: true,
        includePaths: bourbonPaths
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(buildDir + 'css'))
    .pipe($.notify({'title': 'SASS good!', 'message': 'Do you even successful SASS build, bro?!'}));
});





// ----------------------------------------
// ----------------------------------------
// ----------- GULP SCRIPTS----------------
// ----------------------------------------
// ----------------------------------------
// Will flesh this out to do more later

gulp.task('scripts', function(){
  return gulp.src(sourceDir + 'js/**/*.js')
  .pipe(gulp.dest(buildDir + 'js'))
});





// ----------------------------------------
// ----------------------------------------
// ------------- GULP WRAP ----------------
// ----------------------------------------
// ----------------------------------------

gulp.task('layout', function () {
  return gulp.src([sourceDir + 'templates/**/*.html', !sourceDir + 'templates/_base.html'])
    .pipe(wrap({src: sourceDir + 'templates/_base.html'}))
    .pipe(gulp.dest(buildDir))
    .pipe($.notify({'title': 'HTML good!', 'message': 'Do you even successful HTML build, bro?!'}));
});





// ----------------------------------------
// ----------------------------------------
// ------------- GULP CLEAN ---------------
// ----------------------------------------
// ----------------------------------------

gulp.task('clean', function(cb) {
  del(buildDir, cb);
});





// ----------------------------------------
// ----------------------------------------
// ------------- GULP WATCH ---------------
// ----------------------------------------
// ----------------------------------------

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['app/sass/**'], ['sassy']).on('change', livereload.changed);
    gulp.watch(['app/*.js']).on('change', livereload.changed);
    gulp.watch(['app/templates/*.html'], ['layout']).on('change', livereload.changed);
    gulp.watch(['*.html']).on('change', livereload.changed);
    gulp.watch(['app/css/**']).on('change', livereload.changed);
});





// ----------------------------------------
// ----------------------------------------
// --------------- DEFAULT ----------------
// ----------------------------------------
// ----------------------------------------

gulp.task('default', [
    'connect',
    'sassy',
    'scripts',
    'layout',
    'watch'
]);