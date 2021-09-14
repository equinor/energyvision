var MagnificPopupModule = (function () {
    var $ = window.jQuery;
    function scaleCloseButton() {
        // Scale up items with class of .animate on mouseenter
        $('.mfp-close').mouseenter(function () {

            $('.mfp-close').addClass('hover');

            $('.hover').velocity(
                {
                    scale: 1.15,
                },
                {
                    duration: 150,
                    easing: "easeInSine"
                }
            );
        });

        // Scale down items with class of .animate on mouseleave
        $('.mfp-close').mouseleave(function () {

            // Stop any current animation
            $('.hover').velocity("stop");

            // Scale down
            $('.hover').velocity(
                {
                    scale: 1,
                },
                {
                    duration: 150,
                    easing: "easeOutSine"
                }
            );

            $('.mfp-close').removeClass('hover');
        });
    }

    return {
        scaleCloseButton: scaleCloseButton
    };
})();
