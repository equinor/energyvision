/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint @typescript-eslint/no-var-requires: "off" */
const gulp = require('gulp')
const concat = require('gulp-concat')
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
          'src/vendor/jquery-lazy.js',
          'src/vendor/jquery.magnific-popup.js',
          'src/vendor/countUp.js',
          'src/vendor/foundation.js',
          'src/vendor/foundation-datepicker.js',
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
        ],
        [
          'src/animations.js',
          'src/navigation.js',
          'src/modals.js',
          'src/overlay.js',
          'src/carousels.js',
          'src/search.js',
          'src/video.js',
          'src/magazine.js',
          'src/cookiealert.js',
          'src/list.js',
          'src/language-switch-module.js',
          'src/progress-button.js',
          'src/numbers.js',
          'src/magnific-popup-module.js',
          'src/scroll-to-top.js',
          'src/outdated-browser-notification.js',
          'src/useragent.js',
          'src/remittable.js',
          'src/in-page-nav.js',
          'src/horizontal-bar.js',
          'src/calendar.js',
          'src/mailing-list-module.js',
          'src/service-now-module.js',
          'src/foundation-module.js',
          'src/storage-form-date-picker.js',
          'src/magazine-list.js',
          'src/career-fair-form.js',
          'src/buttons.js',
          'src/visual-list.js',
          'src/button-click-on-space-bar.js',
          'src/basicaccordion.js',
          'src/site-switch.js',
          'src/init.js', //Leave init.js at the bottom.
        ],
      ),
      concat('legacy.minified.js'),
      gulp.dest('dist/js'),
    )
  }),
)
