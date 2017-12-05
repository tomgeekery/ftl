
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');

// Set concat order for css files.
const folders = [
  './css/src/vendor/*.css',
  './css/src/elements/*.css',
  './css/src/config/*.css',
  './css/src/components/*.css'
];

// Watch task for browserSync
gulp.task('file-watch', ['css', 'js'], (done)=> {
  browserSync.reload();
  done();
});

// CSS handling
gulp.task('css', ()=> {
  const plugins = [
    cssnext({
      warnForDuplicates: false
    }),
    cssnano()
  ];
  return gulp.src(folders)
    .pipe(postcss(plugins))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./css/dist'));
});

// JS handling
gulp.task('js', ()=> {
  gulp.src('js/src/app.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest('js/dist'))
});

// Default task
gulp.task('default', ['css', 'js'], ()=> {
  browserSync.init({
    proxy: {
      target: 'http://localhost:8000'
    },
    browser: []
  });

  gulp.watch('./css/src/**/*.css', ['file-watch']);
  gulp.watch('./js/src/app.js', ['file-watch']);
});
