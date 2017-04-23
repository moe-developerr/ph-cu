/*
*	npm i -D gulp gulp-sass gulp-sourcemaps gulp-autoprefixer browser-sync gulp-sass-glob gulp-concat gulp-uglify
*/
// packages
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// location variables
const location = {
	styles: {
		src: './assets/src/styles/**/*.scss',
		dist: './assets/dist/styles'
	},
	scripts: {
		src: [
			'./assets/src/scripts/vendors/jquery.js',
			'./assets/src/scripts/vendors/**/*.js',
			'./assets/src/scripts/components/**/*.js'
		],
		dist: './assets/dist/scripts'
	},
	markup: './**/*.php'
};

// tasks
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('initBrowserSync', initBrowserSync);
gulp.task('watchMarkup', watchMarkup);
gulp.task('watchStyles', watchStyles);
gulp.task('watchScripts', watchScripts);
gulp.task('watch', ['initBrowserSync', 'styles', 'scripts'], watch)
gulp.task('default', ['watch']);

// task functions
function styles() {
	return gulp.src(location.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(concat('styles.min.css'))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(location.styles.dist))
    	.pipe(browserSync.stream());
}

function scripts() {
	return gulp.src(location.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.on('error', swallowError)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(location.scripts.dist))
    	.pipe(browserSync.stream());
}

function initBrowserSync() {
	browserSync.init({
		proxy: 'http://culinary'
	});
}

function watchMarkup() {
	return gulp.watch(location.markup, browserSync.reload);
}

function watchStyles() {
	return gulp.watch(location.styles.src, ['styles']);
}

function watchScripts() {
	return gulp.watch(location.scripts.src, ['scripts']);
}

function watch() {
	watchMarkup();
	watchStyles();
	watchScripts();
}

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}