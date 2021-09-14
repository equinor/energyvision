$(document).ready(function($) {
    var body = $('body');
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) {
        body.addClass("ie");
    } else if (userAgent.indexOf("Edge/") > -1) {
        body.addClass("edge");
    } else if (userAgent.indexOf("Firefox/") > -1) {
        body.addClass("ff");
    } else if (userAgent.indexOf("Chrome/") > -1) {
        body.addClass("chrome");
    }
});