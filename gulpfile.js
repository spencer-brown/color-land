const gulp = require('gulp');
const webpack = require('webpack-stream');

const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const uglify = require('gulp-uglifyjs');

const config = {
  clientJsEntry: [
    'src/client/js/index.js'
  ],
  clientJsPath: 'src/client/js/**/*.js',
  clientJsBuildDir: 'build/client',
  clientJsDestDir: 'public/js',
  cssDestDir: 'public/style',
  jsToLintPath: [
    'src/**/*.js',

    '!src/**/lib/**/*.js' /* Ignore external libraries. */ ,

    'gulpfile.js',
  ],
  publicFilesToLiveReload: [
    'public/**',
    '!public/js/build.js',
    '!public/style/index.css'
  ],
  sassPath: 'src/client/sass/**/*.scss',
  sassEntryPath: 'src/client/sass/index.scss',
  serverJsEntry: 'src/server/index.js',
  serverJsPath: 'src/server/**/*.js',
  sharedJsPath: 'src/shared/**/*.js'
};

const clientWebpackConfig = {
  cache: true,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['es2015']
      },
    }]
  }
};

gulp.task('dev', ['server-dev', 'js-client-dev', 'style', 'lint'], () => {
  // Watch for clientside changes and run building tasks.
  gulp.watch([config.clientJsPath, config.sharedJsPath], ['js-client-dev']);

  gulp.watch(config.jsToLintPath, ['lint']);

  // Watch for styling changes and build the new hot style.
  gulp.watch(config.sassPath, ['style']);

  // Watch for any changes on public files and live reload.
  gulp.watch(config.publicFilesToLiveReload, (file) => {
    livereload.changed(file.path);
  });
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
    .pipe(concat('build.js'))
    .pipe(gulp.dest(config.clientJsDestDir));
});


gulp.task('uglify-js-prod', () => {
  gulp.src(config.clientJsBuildDir + '/build.js')
    .pipe(uglify())
    .pipe(gulp.dest(config.clientJsDestDir));
});

gulp.task('server-dev', () => {
  // Watch for changes in server code and restart the server.
  nodemon({
    script: config.serverJsEntry,
    ext: 'js',
    // Use babel for compiling ES6 server code.
    exec: 'babel-node',
    args: ['--presets', 'es2015,stage-2'],
    watch: [config.serverJsPath, config.sharedJsPath]
  }).on('restart', () => {
    setTimeout(() => {
      livereload.reload();
    }, 2000 /* 2s - Let the last instance shutdown */ );
  });
});

gulp.task('default', () => {
  console.log('Error: Please specify dev or prod.');
});