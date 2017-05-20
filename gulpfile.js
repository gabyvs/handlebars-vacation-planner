const browserSync   = require('browser-sync').create();
const gulp          = require('gulp');
const handlebars    = require('gulp-compile-handlebars');
const imageMin      = require('gulp-imagemin');
const less          = require('gulp-less');
const minifyCss     = require('gulp-minify-css');
const rename        = require('gulp-rename');
const sourcemaps    = require('gulp-sourcemaps');
const uglify        = require('gulp-uglify');

/********** IMAGES *********************
 *
 * Read original image files from /src/images/ folder
 * Pass them trough imageMin
 * Save the minified images into dist/images subfolder
 * Continue with browserSync logic only after all previous things have finished
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
 * Continue with browserSync logic only after all previous things have finished
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
 * Read original scripts from /src/scripts/ folder
 * Create sourcemaps with the original content
 * Uglify/minify the scripts
 * Write the sourcemaps to the minified version
 * Save the minified version into /dist/scripts/folder
 * Continue with browserSync logic only after all previous things have finished
 *
 ***************************************/
gulp.task('scripts', () => {
    gulp.src(['src/scripts/main.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
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
 * We don't want any other browserSync logic executed at the end of this process
 *
 ***************************************/
gulp.task('templates', () => {
    const templateData = {};

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