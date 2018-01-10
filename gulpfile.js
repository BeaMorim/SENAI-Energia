var gulp = require('gulp');
var sequence = require('gulp-sequence');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();


gulp.task('clean', function () {
   return gulp.src('build', {read: false})
       .pipe(clean());
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
})

gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

gulp.task('jsConcat', function() {
    return gulp.src('src/app/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('build/app'))
})

gulp.task('build', function(cb) {
    sequence('clean', ['html', 'sass', 'jsConcat'], 'browserSync')(cb)
})

gulp.task('default', ['build'], function(cb) {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/app/**/*.js', ['jsConcat']);
});
