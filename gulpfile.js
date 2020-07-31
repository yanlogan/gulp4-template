'use strict';


// Traditional way of requiring files in a single gulpfile
// const gulp        = require('gulp'),
//       plugins     = require('gulp-load-plugins')(),
//       browserSync = require('browser-sync').create();

// Exporting for several files, $ is the name which can be whatever u want
global.$ = {
    gulp: require('gulp'),
    plugins: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),

    path: {
        tasks: require('./gulp/config/tasks.js')
    }
};

// Because tasks exports an array
$.path.tasks.forEach(taskPath => {
    require(taskPath)();
});

// Tasks go here instead of several files

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts', 'img:dev'),
    $.gulp.parallel('watch', 'serve')
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts', 'img:build'),
    $.gulp.parallel('watch', 'serve')
));