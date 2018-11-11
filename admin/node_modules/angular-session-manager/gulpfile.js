var gulp = require('gulp')
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify');

gulp.task('dist-clean', function() {

  return gulp.src('./dist/')
    .pipe(clean());
});

gulp.task('js-change', function() {

  return gulp.src([
    './src/app.js',
    './src/services/**.js'
  ])
    .pipe(uglify())
    .pipe(concat('session.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch-js', ['dist-clean', 'js-change'], function() {

  gulp.watch('./src/session.js', ['js-change']);
  gulp.watch('./src/services/**.js', ['js-change']);
});

gulp.task('default', ['watch-js']);