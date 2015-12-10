/*jslint node: true */ // allow 'require' global
'use strict';

var gulp       = require('gulp'),
  concat       = require('gulp-concat'),
  del          = require('del'),
  util         = require('gulp-util'),
  es           = require('event-stream'),
  ts           = require('gulp-typescript'),
  bump         = require('gulp-bump'),
  git          = require('gulp-git'),
  filter       = require('gulp-filter'),
  tagVersion   = require('gulp-tag-version'),
  inquirer     = require('inquirer'),
  browserify   = require('browserify'),
  tsify        = require('tsify'),
  buffer       = require('vinyl-buffer'),
  source       = require('vinyl-source-stream'),
  mocha        = require("gulp-mocha"),
  typedoc      = require("gulp-typedoc"),
  yuidoc       = require("gulp-yuidoc");

var sources = {
  app: {
    ts: ['./src/**/*.ts', './typings/**/*.ts'],
    projectFiles: ['./src/**/*.ts', '!./src/_all.ts']
  }
};

var destinations = {
  js: './dist/js',
  definitions: './dist/definitions',
  docs: './docs/'
};

var tsProject = ts.createProject({
  target: 'ES5',
  declarationFiles: true,
  noExternalResolve: true,
  module: 'commonjs',
  removeComments: false
});

gulp.task('js:app', function() {
  var tsStream = gulp.src(sources.app.ts)
        .pipe(ts(tsProject)),
      browserifyStream;

  browserifyStream = browserify('./src/main.ts')
    .plugin(tsify, { noImplicitAny: true })
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(source('main.ts'))
    .pipe(buffer());

  es.merge(
    tsStream.dts.pipe(gulp.dest(destinations.definitions)),
    browserifyStream
    .pipe(concat('django-rest.js'))
    .pipe(gulp.dest(destinations.js))
  );
});

// deletes the dist folder for a clean build
gulp.task('clean', function() {
  del(['./dist'], function(err, deletedFiles) {
    if(deletedFiles.length) {
      util.log('Deleted', util.colors.red(deletedFiles.join(' ,')) );
    } else {
      util.log(util.colors.yellow('/dist directory empty - nothing to delete'));
    }
  });
});

gulp.task('build', [
  'js:app'
]);

gulp.task("yuidoc", function() {
    return gulp
        .src(sources.app.projectFiles)
        .pipe(yuidoc())
        .pipe(gulp.dest(destinations.docs));
});

gulp.task("typedoc", function() {
    return gulp
        .src(sources.app.projectFiles)
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: "commonjs",
            target: "es5",
            includeDeclarations: true,
            mode: "modules",

            // Output options (see typedoc docs)
            out: destinations.docs,
            json: destinations.docs + 'docs.json',

            // TypeDoc options (see typedoc docs)
            name: "angular-formly-rest",
            readme: "README.md",
            // theme: "/path/to/my/theme",
            // plugins: ["my", "plugins"],
            ignoreCompilerErrors: false,
            version: true,
        }))
    ;
});

gulp.task('bump', function() {

  var questions = [
    {
      type: 'input',
      name: 'bump',
      message: 'Are you sure you want to bump the patch version? [Y/N]'
    }
  ];

  inquirer.prompt( questions, function( answers ) {
    if(answers.bump === 'Y') {

      return gulp.src(['./package.json', './bower.json'])
          .pipe(bump({type: 'patch'}))
          .pipe(gulp.dest('./'))
          .pipe(git.commit('bump patch version'))
          .pipe(filter('package.json'))  // read package.json for the new version
          .pipe(tagVersion());           // create tag

    }
  });
});

// watch scripts, styles, and templates
gulp.task('watch', function() {
  gulp.watch(sources.app.ts, ['js:app']);
});

// default
gulp.task('default', ['build', 'watch']);
