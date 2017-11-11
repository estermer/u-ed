const gulp = require('gulp');
const { EOL } = require('os');
const fs = require('fs');
const gutil = require('gulp-util');
const eslint = require('eslint');
const { watch } = require('chokidar');
const { argv } = require('yargs');
const sass = require('gulp-sass');
const webpack = require('webpack');

/* Run eslint.
 * Use `--watch` to automatically re-run when files are changed.
 * Use `--warn` to include warnings.
 */
gulp.task('lint', done => {
  const cli = new eslint.CLIEngine({ extensions: ['.js', '.jsx'] });
  const formatter = cli.getFormatter('stylish');
  const lint = path => {
    const report = cli.executeOnFiles([path]);
    if (report.errorCount || (argv.warn && report.warningCount)) {
      const results = argv.warn ? report.results : eslint.CLIEngine.getErrorResults(report.results);
      gutil.log('[eslint]', formatter(results));
    }
  };

  if (argv.watch) {
    watch('.', {
      ignored: ['local_modules', 'node_modules/', 'build/', 'public/'],
    }).on('all', (event, path) => {
      if (fs.statSync(path).isDirectory() || !path.match(/\.jsx?$/)) return;
      if (event === 'add' || event === 'change') lint(path);
    });
  } else {
    lint('.');
    // Note: To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    done();
  }
});

// Sass Conversion
gulp.task('build-sass', () => {
  gulp
    .src('src/_scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass', () => {
  if (argv.watch) {
    gulp.watch('src/_scss/**/*.scss', ['build-sass']);
  } else {
    gulp.start(['build-sass']);
  }
});

/* Production Builds use this task */
gulp.task('webpack', done => {
  if (argv.production) {
    process.env.BUILD_DEV = false;
    process.env.NODE_ENV = 'production';
  }

  const buildConfig = require('./webpack.config');
  const compiler = webpack(buildConfig);
  const tag = '[webpack]';
  const info = gutil.colors.green;
  const error = gutil.colors.red;
  const warning = gutil.colors.yellow;

  const filterStackTraces = err =>
    err
      .toString()
      .split(/[\r\n]+/)
      .filter(line => !line.match(/^\s+at Parser/))
      .join(EOL);

  if (argv.watch) {
    compiler.watch({}, (err, stats) => {
      const statDetails = stats.toJson();
      if (err) {
        gutil.log(error(tag), err.toString({ colors: true }));
      } else if (stats.hasErrors()) {
        statDetails.errors.forEach(ex => gutil.log(error(tag), filterStackTraces(ex)));
      } else if (stats.hasWarnings()) {
        statDetails.warnings.forEach(wx => gutil.log(warning(tag), filterStackTraces(wx)));
      } else {
        statDetails.chunks.forEach(chunk => {
          if (chunk.entry) gutil.log(info(tag), `Built ${chunk.files[0]} (${chunk.size} bytes)`);
        });
        gutil.log(info(tag), 'Build complete');
      }
    });
  } else {
    compiler.run((err, stats) => {
      if (err) {
        return done(new gutil.PluginError('webpack', err));
      }
      if (stats.hasErrors()) {
        const statDetails = stats.toJson();
        statDetails.errors.forEach(ex => gutil.log(error(tag), filterStackTraces(ex)));
        return done(new gutil.PluginError('webpack', 'Parse/ build error(s)'));
      }
      gutil.log(gutil.colors.green(tag), stats.toString({ colors: true }));
      done();
    });
  }
});

gulp.task('build', ['webpack']);
