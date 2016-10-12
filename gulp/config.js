var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var concat = require('gulp-concat');

gulp.task('local', function() {
	gulp.src('./config/local.json')
		.pipe(ngConstant())
		.pipe(concat('config.js'))
		.pipe(gulp.dest("./public/js/"))
});
