;$(function() {

  function setLinkPosition () {
    $('.visuallist-container').each(function() {
      var heighest = 0;
      $(this).find('.visuallist-item.has-link').each(function() {
        heighest = Math.max(heighest, $(this).find('.text').height());
      }).each(function() {
        var text = $(this).find('.text');
        var link = $(this).find('a');

        var h = text.height();
        var dif = heighest - h;
        link.css({marginTop: 30+dif});
      });
    });
  }

  function initVisualList(scope) {
    $(scope || document).find('.visuallist-item.has-link').click(function (){
      var link = $(this).find('a').attr('href');
      location.href = link;
    }).find('img').each(function(){
      this.addEventListener('load', setLinkPosition);
    });

    setLinkPosition();

  }
  initVisualList();
  $(window).resize(setLinkPosition);

  window.initVisualList = initVisualList;
});