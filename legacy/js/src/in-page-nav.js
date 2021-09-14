var InPageNavigationModule = (function() {
    var $ = window.jQuery;
    var currentState = "";
    function buildAnchor(id, label) {
        var a = document.createElement('a');
        a.setAttribute('aria-label', label);
        a.setAttribute('class', 'dot-nav');
        a.setAttribute('href', '#' + id);

        return a;
    }

    function buildSpan(label) {
        var span = document.createElement('span');
        span.setAttribute('class', 'label');
        span.innerHTML = label;

        return span;
    }

    function initialize() {
        var ul = document.createElement('ul');
        var navigation = $('#in-page-nav');
        navigation.append(ul);

        var anchors = $('div.anchor-container > a');


        $.each(anchors, function() {
            var id = $(this).attr('id');
            var label = $(this).data('label');

            var li = document.createElement('li');
            ul.appendChild(li);

            var a = buildAnchor(id, label);
            li.appendChild(a);

            var span = buildSpan(label);
            a.appendChild(span);

            var dot = document.createElement('span');
            dot.setAttribute('class', 'dot');
            a.appendChild(dot);
        });

        $('.dot-nav').click(function(e) {
            e.preventDefault();
            var target = $(this).attr('href');

            $(target).velocity('scroll', { 
                duration: 800,
                easing: 'ease-in-out',

                complete: function() {
                    window.location.hash = target;
                    $('#in-page-nav ul li').removeClass('active');
                    $(this.parent).addClass('active');
                }

            });

            return false;
        });

        var timer;
        var anchorPosition = [];
        var windowMid = 0;
        function recalculatePositions(){
			anchorPosition = [];
            $(anchors).each(function() {
    	        anchorPosition.push($(this).offset().top);
	        });

            windowMid = window.innerHeight * .5;
        }

        $(document).on('load',recalculatePositions);
        $(window).resize(recalculatePositions);
        recalculatePositions();

        function clearHashFromURL() {
            currentState = '';
            if (window.history.replaceState) {
                window.history.replaceState('', '/', window.location.pathname)
            } else {
                window.location.hash = '';
            }
        }

        function setHashInURL(scrolltarget) {
            if(currentState !== scrolltarget){
                currentState = scrolltarget;
                if (window.history.replaceState) {
                    window.history.replaceState(null, null, scrolltarget)
                } else {
                    window.location.hash = scrolltarget;
                }
            }
        }

        $(document).scroll(function() {

            if (timer) {
                window.clearTimeout(timer);
            }

            timer = window.setTimeout(function() {
                var position = $(document).scrollTop() + windowMid,
                    index;

                for (var i = 0; i < anchorPosition.length; i++) {
                    if (position < anchorPosition[i]) {
                        break;
                    }
                    index = i;
                }

                // Remove active class from all list items
                $('#in-page-nav ul li').removeClass('active');

                // Add the active class to the nearest anchor
                $('#in-page-nav ul li:eq(' + index + ')').addClass('active');

                // Get the href attribute from the active list item and store it as a variable
                var scrolltarget = $('#in-page-nav ul li.active a').attr('href');

                // Update hash in URL if scrolltarget exists and window is not at the top
                if (typeof scrolltarget !== "undefined" && $(window).scrollTop() > 0) {
                    setHashInURL(scrolltarget);
                    // Else, clear the hash from URL
                } else {
                    $('#in-page-nav ul li').removeClass('active');
                    clearHashFromURL();
                }

            }, 100);
        });

    }

    return {
        initialize: initialize
    };

})();
