/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint @typescript-eslint/no-var-requires: "off" */
const gulp = require('gulp')
const concat = require('gulp-concat')
var uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline
const del = require('del')

gulp.task('clean', () => del(['./dist/']))

gulp.task(
  'default',
  gulp.series('clean', function () {
    return pipeline(
      gulp.src(
        [
          'src/vendor/jquery.js',
          'src/vendor/foundation-datepicker.js',
          'src/vendor/polyfills.js',
          'src/vendor/core-wcm-components-v1-accordion.js',
          'src/vendor/modernizr.js',
          'src/vendor/mustache.min.js',
          'src/vendor/slick.js',
          'src/vendor/aos.js',
          'src/vendor/velocity.js',
          'src/vendor/velocity.ui.js',
          'src/vendor/what-input.js',
          'src/vendor/ofi.browser.js',
          'src/vendor/list.min.js',
          'src/vendor/moment.js',
          'src/vendor/moment-timezone-with-data-1970-2030.js',
          'src/animations.js',
          'src/accordion.js',
          'src/carousels.js',
          'src/video.js',
          'src/magazine.js',
          'src/cookiealert.js',
          'src/list.js',
          'src/useragent.js',
          'src/in-page-nav.js',
          'src/horizontal-bar.js',
          'src/calendar.js',
          'src/storage-form-date-picker.js',
          'src/magazine-list.js',
          'src/buttons.js',
          'src/visual-list.js',
          'src/basicaccordion.js',
          'src/init.js', //Leave init.js at the bottom.
        ],
      ),
      uglify(),
      concat('legacy.minified.js'),
      gulp.dest('dist/js'),
    )
  }),
)
