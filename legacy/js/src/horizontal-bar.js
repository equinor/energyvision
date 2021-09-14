$(function () {

  function resize() {
    $('.horisontalbar').each(function () {
      var container = $(this);
      var list = container.find('li:not(.dommy)');

      var dummy = this.dummy ? this.dummy : this.dummy = $('<li class="dommy"></li>');

      var itemsOnLine = Math.floor(container.width() / $(list[0]).width());

      var multiline = list.length > itemsOnLine;
      if (!multiline) {
        container.addClass('singleline');
      } else {
        container.removeClass('singleline');

        var lastLine = list.length % itemsOnLine;
        if (lastLine !== 0 && (itemsOnLine % 2) !== (lastLine % 2)) {
          list.parent().append(dummy);
        }else{
          dummy.remove();
        }
      }
    });
  }
  $(window).resize(resize);

  resize();
});