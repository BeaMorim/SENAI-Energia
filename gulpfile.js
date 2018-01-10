var gulp = require('gulp');
var sequence = require('gulp-sequence');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


gulp.task('clean', function () {
   return gulp.src('build', {read: false})
       .pipe(clean());
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'))
})

gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
});

gulp.task('jsConcat', function() {
    return gulp.src('src/app/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('build/app'))
})

gulp.task('build', function(cb) {
    sequence('clean', ['html', 'sass', 'jsConcat'])(cb)
})

gulp.task('default', ['build'], function(cb) {
    gulp.watch('src/scss/*.scss', ['sass'])
});
