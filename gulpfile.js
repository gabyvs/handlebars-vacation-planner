const browserSync   = require('browser-sync').create();
const browserify    = require('browserify');
const data          = require('./data');
const gulp          = require('gulp');
const handlebars    = require('gulp-compile-handlebars');
const imageMin      = require('gulp-imagemin');
const less          = require('gulp-less');
const minifyCss     = require('gulp-minify-css');
const rename        = require('gulp-rename');
const sourcemaps    = require('gulp-sourcemaps');
const uglify        = require('gulp-uglify');
const buffer        = require('vinyl-buffer');
const source        = require('vinyl-source-stream');

/********** IMAGES *********************
 *
 * Read original image files from /src/images/ folder
 * Pass them trough imageMin
 * Save the minified images into dist/images subfolder
 * Tell browserSync to reload the browser
 *
 ***************************************/
gulp.task('images', () => {
    gulp.src(['src/images/**/*'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

/********** STYLES *********************
 *
 * Read main.less file from /src/styles folder
 * Create sourcemaps with the original content
 * Compile Less and generate CSS content instead
 * Minify the new CSS generated styles
 * Write the sourcemaps to the minified version
 * Save the minified version into /dist/styles/folder
 * Tell browserSync to reload the browser
 *
 ***************************************/
gulp.task('styles', () => {
    gulp.src(['src/styles/main.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

/********** JAVASCRIPT ******************
 *
 * Setup browserify using /src/scripts/main.js as entry point
 * Create a single bundle letting browserify resolve all the required dependencies
 * Use the output to create a single bundled main.js file
 * Convert it into a vinyl file instance
 * Use the vinyl file instance to create a stream that we can pipe to
 * Use that output to create sourcemaps
 * Uglify/minify the output
 * Write the sourcemaps to the minified version
 * Save the minified version into /dist/scripts/folder
 * Tell browserSync to reload the browser
 *
 ***************************************/
gulp.task('scripts', () => {
    const b = browserify({
        entries: './src/scripts/main',
        debug: true
    });

    b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

/********** HANDLEBARS TEMPLATES ********
 *
 * Build data object using a data.json file as input
 * Import the templates from /src/templates folder
 * Batch import the partial templates from /src/templates/partials
 * Pass the partials and the data object to the main template and compile all this into html
 * Rename the compiled template to an html file
 * Save it into root folder
 * We don't want browserSync to reload the browser, default task will take care of that for the main.html file
 *
 ***************************************/
gulp.task('templates', () => {
    const templateData = data;

    const options = {
        batch: ['src/templates/partials']
    };
    gulp.src(['src/templates/*.hbs'])
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('./'));
});

/***** SYNC FILES WITH BROWSER *********
 *
 * Run all tasks for the first load (we need certain assets to be precompiled)
 * Init browserSync server
 * Run styles task on changes to less files on /src/styles/ folder and subfolders
 * Run images task on changes to images on /src/img/ folder and subfolders
 * Run scripts task on changes to JS scripts on /src/scripts/ folder and subfolders
 * Reload browser on changes to html files on root folder
 *
 ***************************************/
gulp.task('default', ['styles', 'images', 'scripts', 'templates'], () => {
    browserSync.init({
        server: './'
    });
    gulp.watch('src/styles/**/*.less', ['styles']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/templates/**/*.hbs', ['templates']);
    gulp.watch('*.html', browserSync.reload);
});