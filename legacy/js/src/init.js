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

 window.initLazy = function() {
   try {
     if(jazy.lazy){
       jazy('.lazy').lazy({
        afterLoad: function(element) {
          var el = element[0];
          objectFitImages(el);
        }
       });
       // This is used to activate lazy load on panel page scroll
       $('.mfp-content .lazy').lazy({
        appendScroll: $('.mfp-content')
       });

      } else {
        // lazy loading fallback
        var lazyElements = $('.lazy');
        lazyElements.each(function(){
          var t = $(this);
          t.removeClass('.lazy')
          .attr('src', t.attr('data-src'))
          .attr('srcset', t.attr('data-srcset'));
        })
        objectFitImages();
      }
    }catch(e){
          }
  };

  $(function() {
    initLazy();
    objectFitImages("img:not(.lazy)");
    if(inIframe()){
      document.body.addEventListener("DOMNodeInserted", function (event) {
          jazy('.lazy').lazy();
      }, false);
    }
  });

  $(".search-button").bind("click",function(){
    if(window.location.pathname.includes("search.html")){
      event.preventDefault();
      window.history.back();
    }
  });

  $(".language-button").bind("click",function(){
    if(window.location.pathname.includes("languages.html")){
      event.preventDefault();
      window.history.back();
    }
  });

  /*
	Components initialization.
  */
  FoundationModule.initialize();
  MailingListModule.initialize();
  ServiceNowModule.initialize();
  SlickCarousel.initialize();
  AOS.init({
    easing: 'linear',
    duration: 1000
  });
})();

