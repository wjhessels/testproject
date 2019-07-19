const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const uglifycss = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
	// where is my scss file
	return gulp.src('./scss/**/*.scss')
		// pass that file through sass compiler
		.pipe(sass())
		// where do i save the compiled css
		.pipe(gulp.dest('./css'))
		// stream changes to all browser
		.pipe(browserSync.stream());

}

function uglifyme() {
	return gulp.src('./css/**/*.css')
	    .pipe(uglifycss({
	      "uglyComments": true
	    }))
	    .pipe(gulp.dest('./dist/'));
}

function miniimage() {
	return gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./css/*', uglifyme);
	gulp.watch('./images/*', miniimage);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.miniimage = miniimage;
exports.style = style;
exports.watch = watch; 