const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
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
	gulp.watch('./images/*', miniimage);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;