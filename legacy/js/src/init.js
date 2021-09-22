(function() {
  var $ = window.jQuery;
  /*
	Google reCaptcha callback function which reads all
  the forms and attach individual reCaptcha for each.
  */
 var onloadCallback = function() {
   try {
     $('form').each(function(index) {
       var reCaptchaId = $(this).attr("id")+"-recaptcha";
       var widgetId = grecaptcha.render(reCaptchaId, {
         'theme' : 'light'
        }, true);
        $(this).attr("data-recaptcha-id",widgetId);
      });
    } catch (e) {

    }
  };
  window.onloadCallback = onloadCallback;
  /*
	jQuery selectric plugin configuration
  */

  /*
  jQuery lazy plugin configuration
  */
 function inIframe () {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
}
  /*
	Components initialization.
  */
  SlickCarousel.initialize();
  AOS.init({
    easing: 'linear',
    duration: 1000
  });
})();

