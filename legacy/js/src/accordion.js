$('.cmp-accordion__item').each(function() {
  var panel = $(this).find('.cmp-accordion__panel');
  panel.hide();
  var observer = new MutationObserver(function(mutationList, observer) {

    if(mutationList[0].attributeName !== 'class'){
      return;
    }
    if(panel.hasClass('cmp-accordion__panel--expanded')){
      panel.slideDown();
    } else {
      panel.slideUp();
    }
  });
  observer.observe(panel[0], {attributes: true, attributeFilter:['class']});
});