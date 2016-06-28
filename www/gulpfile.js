var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var assign = Object.assign || require('object.assign');
var browserSync = require('browser-sync');

var appRoot = 'src/';
var outputRoot = 'dist/';

var paths = {
    root: appRoot,
    source: appRoot + '**/*.js',
    html: appRoot + '**/*.html',
    output: outputRoot
};

var compilerOptions = {
    modules: 'system',
    moduleIds: false,
    comments: false,
    compact: false,
    stage: 2,
    optional: [
      'es7.decorators',
      'es7.classProperties'
    ]
};

// deletes all files in the output path
gulp.task('clean', function() {
    return gulp.src([paths.output])
      .pipe(vinylPaths(del));
});

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
gulp.task('build-system', function() {
    return gulp.src(paths.source)
      .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
      .pipe(changed(paths.output, {extension: '.js'}))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(babel(assign({}, compilerOptions, {modules: 'system'})))
      .pipe(sourcemaps.write({includeContent: true}))
      .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
    return gulp.src(paths.html)
      .pipe(changed(paths.output, {extension: '.html'}))
      .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(callback) {
    return runSequence(
      'clean',
      ['build-system', 'build-html'],
      callback
  );
});

gulp.task('serve', ['build'], function(done) {
    browserSync({
      online: false,
      open: false,
      port: 9000,
      server: {
        baseDir: ['.'],
        middleware: function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }
      }
    }, done);
});

function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function() {
    gulp.watch(paths.source, ['build-system', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
});
