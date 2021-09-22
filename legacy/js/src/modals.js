jQuery(document).ready(function ($) {
    ModalModule.initialize();
});

var ModalModule = (function(){
function initialize(){
    var clean = function(){
        var bg=$('.mfp-bg')
        if(bg) bg.remove();
        var wrap=$('.mfp-wrap')
        if(wrap) wrap.remove();
    }

    function blurIn() {
        $('.container').attr("aria-hidden", "true");
    }

    function blurOut() {
        $('.container').removeAttr("aria-hidden");

    }

    function setCloseButtonListener(){
        $(".mfp-close").on("click touch", function(){
            $.magnificPopup.close();
        });

    }

    function contentStopPropagation() {
        $('.mfp-content').click(function( event ) {
            if(event.target.className != "mfp-close") {
                event.stopPropagation();
            }
        });
    }

    /* This function runs the cookiebot scripts on
       panel pages which is required to load the iframes
       which are dependent on consent
    */
    function runCookiebotScripts() {
        if(typeof Cookiebot != "undefined") {
            Cookiebot.runScripts();
        }
    }

    var closeMarkup = "<button title='%title%' type=\"button\" class=\"mfp-close si si-close-button\" >\n" +

        "</button>";

    var focusCloseButton = function(){
        $(".mfp-close").focus()
    }


    $('.inverse-panel').magnificPopup({
        type: 'ajax',
        closeOnContentClick: false,
        closeMarkup:closeMarkup,
        closeOnBgClick: true,
        disableOn:1200,
        removalDelay: 300,
        mainClass: 'mfp-slide',
        callbacks: {
            beforeOpen: function() {
                this.st.el.attr('aria-expanded', 'true')
                clean();
            },
            open: function() {
                contentStopPropagation();
            },
            close: function() {
                window.location.hash = "";
                this.st.el.attr('aria-expanded', 'false')
            },
            afterClose: function() {
                this.st.el.siblings('.button-focus-catcher').focus();
            },
            parseAjax: function(mfpResponse) {
                mfpResponse.data = $(mfpResponse.data).find('.content.panel-content');
            },
            ajaxContentAdded: function() {
                var hash = this.currItem.src;
                if(hash.indexOf("#") > -1) {
                    window.location.hash = "#" + hash.split('#')[1];
                }
                setCloseButtonListener();
                focusCloseButton();
                MagnificPopupModule.scaleCloseButton();
                window.numberAnimation('.mfp-slide');
                window.initVisualList('.mfp-content');
                window.initLazy();
            }
        }
    });

    $('.panel').magnificPopup({
        type: 'ajax',
        closeOnContentClick: false,
        closeMarkup:closeMarkup,
        closeOnBgClick: true,
        disableOn:1200,
        removalDelay: 300,
        mainClass: 'mfp-slide legacyStyles',
        callbacks: {
            beforeOpen: function() {
                this.st.el.attr('aria-expanded', 'true')
                clean();
            },
            open: function() {
                contentStopPropagation();
            },
            close: function() {
                window.location.hash = "";
                this.st.el.attr('aria-expanded', 'false')
            },
            afterClose: function() {
                this.st.el.siblings('.button-focus-catcher').focus();
            },
            parseAjax: function(mfpResponse) {
                mfpResponse.data = $(mfpResponse.data).find('.content.panel-content');
            },
            ajaxContentAdded: function() {
                var hash = this.currItem.src;
                if(hash.indexOf("#") > -1) {
                    window.location.hash = "#" + hash.split('#')[1];
                }
                SlickCarousel.initialize();
                /* Disabling AOS as it doesn't have support on panel pages*/
                AOS.init({disable: true});
                /* Runs the cookiebot scripts to load the iframes on panel pages */
                runCookiebotScripts();
                setCloseButtonListener();
                focusCloseButton();
                MagnificPopupModule.scaleCloseButton();
                onloadCallback();
                window.initVisualList('.mfp-content');
            }
        },
    });
    }
    return{
        initialize: initialize
    };
})();