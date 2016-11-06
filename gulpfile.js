/**
 * Created by robbertdeman on 06-09-16.
 */

const gulp = require("gulp");
const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require('browser-sync').create();

gulp.task("run", function() {
    var bundler = browserify({
        entries: './src/script.es6',
        debug: true
    })
        .transform(babelify, {presets: ['es2015']})
        .bundle();

    return bundler
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task("watch", function () {
    gulp.watch("./src/**/*.*", ["run"]);
    gulp.watch("./items/**/*.html" ["html"]);
    gulp.watch(['./dist/**/*.js','./*.html']).on('change', browserSync.reload);
});

gulp.task("default", ["watch", "run", "browser-sync"]);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});