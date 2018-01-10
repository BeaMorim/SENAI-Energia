var gulp = require('gulp');
var sequence = require('gulp-sequence');
var clean = require('gulp-clean');
var sass = require('gulp-sass');


gulp.task('clean-build', function () {
   return gulp.src('build', {read: false})
       .pipe(clean());
});

gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
});

gulp.task('default', function(cb) {
    sequence('clean-build', 'sass')(cb)
});
