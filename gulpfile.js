const gulp = require('gulp');
const webpack = require('webpack-stream');

const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
// const livereload = require('gulp-livereload');
// const pug = require('gulp-pug');
const sass = require('gulp-sass');
const uglify = require('gulp-uglifyjs');

const config = {
  clientJsEntry: [
    'src/client/index.js'
  ],
  clientJsPath: 'src/client/**/*.js',
  clientJsBuildDir: 'build/client',
  clientJsDestDir: 'public/js',
  cssDestDir: 'public/style',
  jsToLintPath: [
    'src/**/*.js',

    '!src/**/lib/**/*.js' /* Ignore external libraries. */ ,

    'gulpfile.js',
  ],
  publicFilesToLiveReload: [
    '!public/**/*.*',
    // '!public/js/index.js',
    // '!public/style/index.css'
  ],
  sassPath: 'sass/**/*.scss',
  sassEntryPath: 'sass/index.scss'
};

const clientWebpackConfig = {
  cache: true,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react']
      },
    }]
  }
};

gulp.task('dev', ['js-client-dev', 'style', 'lint'], () => {
  // Watch for clientside changes and run building tasks.
  gulp.watch(config.clientJsPath, ['js-client-dev']);

  gulp.watch(config.jsToLintPath, ['lint']);

  // Watch for styling changes and build the new hot style.
  gulp.watch(config.sassPath, ['style']);

  // Watch for any changes on public files and live reload.
  // gulp.watch(config.publicFilesToLiveReload, (file) => {
  //   livereload.changed(file.path);
  // });
});

gulp.task('style', () => {
  return gulp.src(config.sassEntryPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssDestDir));
});

// Run eslint and display the results.
gulp.task('lint', () => {
  return gulp.src(config.jsToLintPath)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.formatEach());
});

// Build the js using webpack and pipe it into a build.js file in the public folder.
gulp.task('js-client-dev', () => {
  // Build in the client code starting from the entry point.
  return gulp.src(config.clientJsEntry)
    .pipe(webpack(clientWebpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors.
    })
    .pipe(concat('index.js'))
    .pipe(gulp.dest(config.clientJsDestDir));
});

gulp.task('uglify-js-prod', () => {
  gulp.src(config.clientJsBuildDir + '/index.js')
    .pipe(uglify())
    .pipe(gulp.dest(config.clientJsDestDir));
});

gulp.task('default', () => {
  console.log('Error: Please specify dev or prod.');
});