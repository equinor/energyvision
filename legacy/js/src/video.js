$(document).ready(function ($) {

    var topBannerVideoPlayButton = $(".banner-video svg");
    var video = $(".banner-video video");

    video.on('play', function () {
        topBannerVideoPlayButton.fadeOut();
    });
    video.on('pause', function () {
        topBannerVideoPlayButton.fadeIn();
    });

    topBannerVideoPlayButton.on('click', function() {
        video[0].play();
    });
    if (!video.attr("controls")) {
    	video.click(function(){this.paused?this.play():this.pause();})
    }
    if (!video.attr("autoplay")) {
        topBannerVideoPlayButton.show();
    }
});