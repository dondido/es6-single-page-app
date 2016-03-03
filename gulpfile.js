var gulp = require('gulp'),
  del = require('del'),
  size = require('gulp-size'),
  jshint = require('gulp-jshint'),
  htmlmin = require('gulp-htmlmin'),
  moreCSS = require('gulp-more-css'),
  imageOptim = require('gulp-imageoptim'),
  exec = require('child_process').exec;
gulp.task('clean', () =>
  del.sync(['./dist/**'])
);
gulp.task('html', () => 
  gulp.src(['src/html/*.html', 'src/index.html'], {base: './src'})
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(size())
    .pipe(gulp.dest('dist'))
);
gulp.task('css', () =>
  gulp.src('./src/css/index.css')
    .pipe(moreCSS())
    .pipe(size())
    .pipe(gulp.dest('./dist/css'))
);
gulp.task('images', () =>
  gulp.src(['src/images/**/*', 'src/favicon.ico'], {base: './src'})
    .pipe(imageOptim.optimize())
    .pipe(size())
    .pipe(gulp.dest('dist/'))
);
gulp.task('movejs', () =>
  gulp.src(
      ['src/jspm_packages/**/*', 'src/js/**/*', 'src/*.js', 'src/*.json'],
      {base: './src'}
    )
    .pipe(size())
    .pipe(gulp.dest('dist/'))
);
gulp.task('jspm', () =>
  exec('cd dist && jspm bundle index bundle.js --skip-source-maps --inject --minify')
);
gulp.task('lint', () =>
  gulp.src(['./src/js/**/*', '!./src/js/vendors/**/*'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
);
gulp.task('js', ['movejs'], () => gulp.start('jspm'));
gulp.task('build', ['clean', 'html', 'js', 'css', 'images']) // build for production