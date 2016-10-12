'use strict';
var requireDir = require('require-dir');
var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var del = require('del');
var livereload = require('gulp-livereload');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var stubby = require('gulp-stubby-server');
var awspublish = require('gulp-awspublish');
var imagemin = require('gulp-imagemin');

requireDir('./gulp', { recurse: true });

var nodeDir = './node_modules' ;

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['browserify']);
  gulp.watch('app/**/*.html', ['templates', 'html']);
	gulp.watch('app/**/*.css', ['html']);
});

gulp.task('images', function () {
    gulp.src('images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('public/images'))
  }
);

gulp.task('browserify', function() {
  return browserify('./app/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(connect.reload());
});

gulp.task('icons', function() { 
    return gulp.src(nodeDir + '/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('connect', function () {
	connect.server({
    livereload: true,
		root: 'public',
		port: 4000
	})
});

gulp.task('connect-prd', function () {
	connect.server({
    livereload: true,
		root: 'public',
		port: 4000
	})
});

gulp.task('stubby', function(cb) {
    var options = {
        stubs: 3000,
        tls: 8443,
        admin: 8010,
        mute: false,
        location: '0.0.0.0',
        files: ['mocks/**/*.{json,yaml,js}']
    };
    stubby(options, cb);
});

gulp.task('templates', function () {
  return gulp.src('app/**/*.html')
    .pipe(templateCache({standalone:true}))
    .pipe(gulp.dest('./public/js/'))
    .pipe(connect.reload());;
});

gulp.task('minify-html', ['browserify', 'icons', 'html', 'templates'], function() {
  return gulp.src('public/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-js', ['browserify', 'icons', 'html', 'templates'], function (cb) {
  pump([
        gulp.src('public/**/*.js'),
        uglify(),
        // rename({suffix: ".min"}),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('minify-css', ['browserify', 'icons', 'html', 'templates'], function() {
  return gulp.src('public/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('jshint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean-temp', ['minify'], function () {
  livereload();
  return del(['temp']);
});

gulp.task('build', ['browserify', 'icons', 'images', 'html', 'templates', 'minify-js','minify-css','minify-html']);
gulp.task('server', ['connect', 'stubby', 'browserify', 'icons', 'images', 'html', 'templates', 'watch']);
gulp.task('server-prd', ['connect-prd', 'stubby', 'build']);

// Publish to AWS S3
gulp.task('publish', ['browserify', 'icons', 'html', 'templates'], function() {
  var publisher = awspublish.create({
    region: 'sa-east-1',
    params: {
      Bucket: 'basic-web'
    }
  });
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };
  return gulp.src('public/**')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

gulp.task('deployS3', ['browserify', 'icons', 'html', 'templates', 'publish']);
