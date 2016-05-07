// //////////////////////////////////////////////////
// Required
// //////////////////////////////////////////////////

var gulp = require ('gulp');
var browserSync = require ('browser-sync');
var reload = browserSync.reload;
var uglify = require ('gulp-uglify');
var rename = require ('gulp-rename');
var util = require ('gulp-util');
var sass = require ('gulp-sass');
var prefix = require ('gulp-autoprefixer');
var del = require ('del');

// //////////////////////////////////////////////////
// Tasks
// //////////////////////////////////////////////////

// Javascript
gulp.task ('scripts', function(){
  gulp.src (['src/assets/js/**/*.js', '!src/assets/js/**/*.min.js'])
      .pipe (rename ({suffix: '.min'}))
      .pipe (uglify().on('error', util.log))
      .pipe (gulp.dest ('src/assets/js/'))
      .pipe (reload({stream: true}));
});

// Sass
gulp.task ('sass', function(){
  gulp.src ('src/assets/css/**/*.sass')
      .pipe (sass().on('error', sass.logError))
      .pipe (prefix (['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe (gulp.dest('src/assets/css'))
      .pipe (reload({stream: true}));
});

// HTML
gulp.task ('html', function() {
  gulp.src ('src/**/*.html')
      .pipe (reload({stream: true}));
})

// Live reload
gulp.task ('browser-sync', function(){
  browserSync({
    server: {
      baseDir: "src/"
    }
  });
});

// //////////////////////////////////////////////////
// Build Task
// //////////////////////////////////////////////////

// Deletes previous folder
gulp.task ('build:cleanfolder', function(cb) {
  del([
    'build/**',
    '!build'
  ], cb());
});

// Copies all the files
gulp.task ('build:copy', ['build:cleanfolder'], function(cb) {
  return gulp.src ('src/**/*/')
            .pipe (gulp.dest ('build/'));
});

// Cleans up what not required
gulp.task ('build:remove', ['build:copy'], function() {
  del ([
    'build/assets/css/**', '!build/assets/css', '!build/assets/css/*.css',
    'build/assets/js/!(*.min.js)'
  ]);
});

// Call this whenever a build is needed
gulp.task ('build', ['build:remove', 'build:copy', 'build:cleanfolder']);

// This is to serve it on a server
gulp.task ('build:serve', function() {
  browserSync({
    server: {
      baseDir: "build/"
    }
  });
});

// //////////////////////////////////////////////////
// Watch Task
// //////////////////////////////////////////////////

gulp.task ('watch', function() {
  gulp.watch (['src/assets/js/**/*.js', '!src/assets/js/**/*.min.js'], ['scripts']);
  gulp.watch ('src/assets/css/**/*.sass', ['sass']);
  gulp.watch ('src/**/*.html', ['html']);
});

// //////////////////////////////////////////////////
// Default Task
// //////////////////////////////////////////////////

gulp.task ('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);
