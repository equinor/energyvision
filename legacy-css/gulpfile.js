/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path')
// Include gulp
const gulp = require('gulp')

// Include Plugins
const scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  iconfont = require('gulp-iconfont'),
  consolidate = require('gulp-consolidate'),
  copyAssets = require('gulp-css-copy-assets').default,
  rename = require('gulp-rename'),
  del = require('del'),
  // eslint-disable-next-line no-unused-vars
  _ = require('lodash')

scss.compiler = require('node-sass')

// ES6-promise is required by autoprefixer
require('es6-promise').polyfill()

const copySettings = {
  srcdirs: [__dirname + '/src/font'],
  resolve: '../fonts',
}

/**
 * Will look for .scss|sass files inside the node_modules folder
 */
let aliases = {}

function npmModule(url, file, done) {
  // check if the path was already found and cached
  console.log('import', url)
  if (aliases[url]) {
    return done({ file: aliases[url] })
  }

  // look for modules installed through npm
  try {
    const newPath = path.relative('./css', require.resolve(url))
    aliases[url] = newPath // cache this request
    return done({ file: newPath })
  } catch (e) {
    // if your module could not be found, just return the original url
    aliases[url] = url
    return done({ file: url })
  }
}

const scssSettings = {
  importer: npmModule,
}

//  Gulp functions
//  ---------------------------------------------------------------------------------------
console.log(copyAssets)

// Delete dist folder
gulp.task('clean', () => del(['./dist/']))

// Build SASS
gulp.task('compass-minify', () =>
  gulp
    .src('src/sass/legacy.scss')
    .pipe(scss(scssSettings))
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.minified' }))
    .pipe(copyAssets(copySettings))
    .pipe(gulp.dest('dist/css')),
)

// Build SASS
gulp.task('compass-unminified', () =>
  gulp.src('src/sass/common.scss').pipe(scss(scssSettings)).pipe(copyAssets(copySettings)).pipe(gulp.dest('dist/css')),
)

// Build icons
const fontName = 'equinor_icons'

gulp.task('Iconfont', () =>
  gulp
    .src(['src/icons/*.svg'])
    .pipe(
      iconfont({
        fontName: fontName,
        appendUnicode: true,
        formats: ['woff'],
        normalize: true,
      }),
    )
    .on('glyphs', function (glyphs, options) {
      console.log(glyphs, options)
      gulp.src('src/sass/icons/equinor-icons.css').pipe(
        consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: 'si',
        }),
      )
    })
    .pipe(gulp.dest('dist/fonts')),
)

//  Gulp Tasks
//  ---------------------------------------------------------------------------------------

// Default Task
gulp.task('default', gulp.series('clean', gulp.parallel('compass-minify', 'Iconfont')))

// Watch Task
gulp.task('watch', () => gulp.watch(['src/sass/*.scss', 'src/sass/**/*.scss'], ['compass-minify']))

// Autoprefixer
gulp.task('autoprefixer')

// CSS Lint Task
gulp.task('css-lint')
