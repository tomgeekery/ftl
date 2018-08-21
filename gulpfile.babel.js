'use strict';

import gulp from "gulp";
import cssnano from "cssnano";
import babel from "gulp-babel";
import postcss from "gulp-postcss";
import BrowserSync from "browser-sync";
import cssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import postcssPresetEnv from "postcss-preset-env";

const browserSync = BrowserSync.create();

// CSS task
gulp.task('css', (done)=> {
  gulp.src("./css/src/tachyons.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([
      cssImport({ from: "./src/css/main.css" }),
      autoprefixer(),
      postcssPresetEnv(),
      cssnano()
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./css/dist"));

    browserSync.reload();
    done();
});

// JavaScript task
gulp.task('js', (done)=> {
  gulp.src('js/src/app.js')
  .pipe(babel({ presets: ['env'] }))
  .pipe(gulp.dest('js/dist'));

  browserSync.reload();
  done();
});

// Default task
gulp.task("default", ["css", "js"], ()=> {
  browserSync.init({
    browser: [],
    proxy: { target: 'http://lble.lndo.site' }
  });

  gulp.watch('./css/src/**/*.css', ["css"]);
  gulp.watch('./js/src/**/*.js', ["js"]);
});
