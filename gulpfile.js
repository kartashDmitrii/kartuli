//Подключаем модули галпа
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const webpack = require('webpack-stream');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const del = require('del');
const foreach = require('gulp-foreach');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const order = require("gulp-order");
const log = require('fancy-log');
const fileinclude = require('gulp-file-include');


function libStyles(){
    return gulp.src('./src/libCss/**/*.css')
        .pipe(concat('lib.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}
function libJs(){
    return gulp.src('./src/libJs/**/*.js')
        .pipe(order([
            "lib.js"
            ]))
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}
function sassCompile(){
  return gulp.src('./src/sass/**/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./src/css'))
  .pipe(concat('style.css'))
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(cleanCSS({
      level: 2
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
}
function scssCompile(){
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}
function scripts() {
   return gulp.src('./src/js/*.js')
   .pipe(babel())
   .pipe(webpack({
       output: {
           filename: '[name].js'
       },
       optimization: {
           minimize: false
       }
   }))
   .pipe(sourcemaps.init())
   .pipe(minify({
       noSource: true,
       mangle: false,
       compress: false
   }))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('./build/js'))
   .pipe(browserSync.stream());
}
function move() {
	return gulp.src('./src/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
	.pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}
function moveImg() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./build/img'))
}
function moveFonts(){
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'))
}
function clean() {
   return del(['build/*'])
}
function watch() {
   browserSync.init({
      server: {
          baseDir: "./build/"
      }
  });
  gulp.watch('./src/sass/**/*.sass', gulp.series(sassCompile));
  gulp.watch('./src/sass/**/*.scss', gulp.series(scssCompile));
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/**/*.html', move);
  gulp.watch("./src/**/*.html").on('change', browserSync.reload);
  gulp.watch('./src/libCss/**/*.css', libStyles);
  gulp.watch('./src/libJS/**/*.js', libJs);
}

gulp.task('move', move);
gulp.task('moveImg', moveImg);
gulp.task('libStyles',libStyles);
gulp.task('libJs', libJs);
gulp.task('moveFonts', moveFonts);
gulp.task('img', function(){
	return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
});
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('sassCompile', sassCompile);
gulp.task('scssCompile', scssCompile);
gulp.task('styleCompile', gulp.series(sassCompile,scssCompile, /*styles*/));
gulp.task('build', gulp.series(clean, move, moveImg, moveFonts,libStyles,libJs, gulp.parallel('styleCompile',scripts)));
gulp.task('dev', gulp.series('build','watch'));