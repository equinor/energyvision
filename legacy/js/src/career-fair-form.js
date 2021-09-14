/* This code is custom to career fair form*/
;(function(){
    var $ = window.jQuery;
    var showHideCareerFairHelperText = function () {

        $("#snCareerFair-event").change(function() {
            if(this.value === "visitStatoilOffice")
            $(".career-fair-visit-help-text").show();
            else
            $(".career-fair-visit-help-text").hide();
        });
    }
    window.showHideCareerFairHelperText = showHideCareerFairHelperText;
    showHideCareerFairHelperText();
})();
