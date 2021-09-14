function toggleOverlay() {
    function fadeInOverlay() {
        $('body').addClass("overlay");
        $('.page-overlay').css("display", "block");
        $('.page-overlay').animate({
            opacity: 0.6
        }, 500, function() {
        });
    }

    function fadeOutOverlay() {
        $('body').addClass("overlay-out");
        $('.page-overlay').animate({
            opacity: 0.0
        }, 500, function() {
            $('.page-overlay').css("display", "none");
        });
    }

    if($('body').hasClass("overlay")) {
        $('body').removeClass("overlay");
        fadeOutOverlay();
    } else if ($('body').hasClass("overlay-out")) {
        $('body').removeClass("overlay-out");
        fadeInOverlay();
    } else {
        fadeInOverlay();
    }
}

