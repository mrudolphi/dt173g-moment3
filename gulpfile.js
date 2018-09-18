const gulp = require('gulp');
const concatJS = require('gulp-concat');
const uglifyJS = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concatCSS = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

/* Copy html-files to pub-folder */
gulp.task('copyhtml', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('pub/'))
});

/* Concat, minimize js-files and copy to pub/js-folder */
gulp.task('conminjs', function() {
    return gulp.src('src/js/*.js')
        .pipe(concatJS('main.min.js'))
        .pipe(uglifyJS())
        .pipe(gulp.dest('pub/js'));
});

/* Convert SASS to CSS */
gulp.task('sass', function () {
	return gulp.src('src/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/css/'));
});

/* Concat, minimize css-files and copy to pub/css-folder */
gulp.task('conmincss', function() {
    return gulp.src('src/css/*.css')
        .pipe(concatCSS('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('pub/css'));
});

/* Minimize images and copy to pub/images-folder */
gulp.task('minimages', function() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('pub/images'));
});

/* Watch updates for html, js, css, images */
gulp.task("watcher", function() {
	gulp.watch('src/js/*.js', ['conminjs']);
	gulp.watch('src/scss/*.scss', ['sass']);
	gulp.watch('src/css/*.css', ['conmincss']);
	gulp.watch('src/images/*', ['minimages']);
	gulp.watch('src/*.html', ['copyhtml']);
});

/* Run tasks and watcher when gulp starts */
gulp.task('default', ['copyhtml', 'conminjs', 'sass', 'conmincss', 'minimages', 'watcher']);