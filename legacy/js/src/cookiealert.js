;(function(){
    var statoil = {};
    statoil.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    };

    jQuery(document).ready(function ($) {
        $('.cookie-alert .cookie-close').click(function(){
            var expireDate = new Date();
            expireDate.setTime(expireDate.getTime()+(365*86400000));
            expireDate = expireDate.toGMTString();
            var cookieEntry = 'cookiealert=hide; expires='+expireDate+'; path=/;samesite=lax;secure';
            document.cookie=cookieEntry;

            $('.cookie-alert').slideUp(500, function() {
                $('.cookie-alert').remove();
            });

            return false;
        });
        if(statoil.getCookie("cookiealert")!=="hide"){
            $('.cookie-alert').css("display", "flex");
        }
    });
})();
