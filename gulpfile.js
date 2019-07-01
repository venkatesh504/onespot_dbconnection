'use strict'
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const gulpNodemon = function (callback) {
  var started = false;

  return nodemon({
    script: 'server.js',
    ext: 'js json',
    env: {
      'NODE_ENV': 'development'
    },
    ignore: [
      'src/',
      'dist/',
      'node_modules/'
    ],
    watch: ['./backend-services/*', 'rest-app/*', 'src/app/*'],
    stdout: true,
    readable: true
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      callback()
      started = true
    }
  })
}

gulp.task('nodemon', gulpNodemon)
exports.default = gulpNodemon
