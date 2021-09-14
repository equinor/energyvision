var SlickCarousel = (function () {
    var $ = window.jQuery;
        function initialize() {
            $(".slideshow").each(function(){

                var time = $(this).data('duration') || 7000;
                $(this).not('.slick-initialized').slick({
                    infinite: false,
                    dots: true,
                    autoplay:true,
                    autoplaySpeed: time,
                    rows: 0,
                    prevArrow: false,
                    nextArrow: false
                });

                $(this).find('.slick-slide').each(function(){
                    var time = 0;
                    var sx = 0;
                    var sy = 0;


                    $(this).on('mousedown touchstart', function(e){
                        time = new Date().getTime();
                        sx = e.screenX;
                        sy = e.screenY;
                    })
                    $(this).on('mouseup touchend', function(e){
                        if(e.originalEvent.button != 0){
                            return
                        }

                        var timedelta = new Date().getTime() - time;
                        var sxd = Math.abs(e.screenX - sx);
                        var syd = Math.abs(e.screenY - sy);

                        if (timedelta < 500 && sxd < 50 && syd < 50){
                            var anchor = $(this).find('a');
                            var link = anchor.attr('href');
                            if(link){
                                window.location.href = link;
                            }
                        }
                    })
                })
            })
        }

        return {
            initialize: initialize
        };
})();