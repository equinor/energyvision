(function(){
    var $ = window.jQuery;
    // Check if it's time to start the animation.
    function doAnimation($elem) {
        // If the animation has already been started
        var type="start";
        if(!($elem instanceof jQuery))
        $elem = $($elem)
        if ($elem.hasClass(type)){return;}
        $elem.addClass(type);

        var id = $elem.attr("id");

        var number = $elem.data("number");
        var suffix = getSuffix(number);
        if(suffix!=""){
            number = number.replace(suffix, "");
        }

        var decimal = getDecimal(number);
        var seperator = decimal==""?"":".";
        number = setAsInteger(number, suffix);
        var numberOfDecimals= getNumberOfDecimals(number);

        var options = {
            useEasing : true,
            useGrouping : true,
            separator :'',
            decimal :decimal,
            prefix : '',
            suffix : suffix
        };
        var demo = new CountUp(id, 0, number, numberOfDecimals, 2.5, options);
        demo.start();
    }



    function getSuffix(number){
        if((number +"").indexOf("%")>-1){
            return "%";
        }
        return "";
    }

    function setAsInteger(number, suffix){
        if(hasComma(number)){
            number=(number+"").replace(",",".");
        }
        if(hasSpace(number)){
            number=(number+"").replace(" ",".");
        }
        if(hasDash(number)){
            number=(number+"").replace("-",".");
        }

        return number;
    }

    function getDecimal(number){
        if(hasComma(number))
        return ",";
        if(hasPunctuation(number))
        return ".";
        if(hasSpace(number))
        return " ";
        if(hasDash(number))
        return "-";
        return "";
    }

    function hasSuffix(number, suffix){
        return (number +"").indexOf(suffix)>-1
    }

    function hasDash(number){
        return (number +"").indexOf("-")>-1
    }

    function hasComma(number){
        return (number +"").indexOf(",")>-1
    }

    function hasPunctuation(number){
        return (number +"").indexOf(".")>-1
    }
    function hasSpace(number){
        return (number +"").indexOf(" ")>-1
    }
    function getNumberOfDecimals(number){
        number = parseFloat(number);
        var n = Math.abs(number); // Change to positive

        var decimal = (n+"").split('.')[1];
        return decimal==null? 0 : decimal.length;
    }



    function isElementInViewport (el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    var scrollTimeout;
    $(window).scroll(function () {
        if (scrollTimeout) {
            // clear the timeout, if one is pending
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }
        scrollTimeout = setTimeout(animateHandler, 250);
    });

    $(window).on("load", function(){
        animateHandler();
    });

    var animateHandler = function (target) {
        var numbers = target ? $(target).find('.number') : $('.number');
        numbers.each(function () {
            var current = $(this);
            if(current.hasClass("countup")){
                if(isElementInViewport(this)) {
                    doAnimation(this);
                } else if (target) {
                    // If countup is opened in a panel
                    var current = this;
                    setTimeout(function(){
                        doAnimation(current)
                    }, 400);
                }
            }else{
                current.text(current.data("number"));
            }
        });
    };
    window.numberAnimation = animateHandler;
})();