(function(){
    var $ = window.jQuery;
    function resetSearch() {
        $(".show-all.few-results").removeClass("few-results");
        $(".column .hits").html("");
        $(".column .hits").data("count", 0);
        $(".search-field-results").html($('.no-result').first().html());
    }

    function resultCount(columnId) {
        var count = $("#global-search #"+columnId+" .results").children("article").length;
        var hits = $("#global-search #"+columnId+" .hits");
        var emptyText = $('#search-language').data("emptysearch");
        // if no results
        if (count === 0) {
            $("#global-search #"+columnId+" .result").remove();
            $("#global-search #"+columnId+" .results").append('<div class="no-result">'+emptyText+'</div>');
            hits.siblings(".show-all").addClass("few-results");
            hits.parent().addClass("no-results");
        } else {
            hits.parent().removeClass("no-results");
            if ($("#global-search #"+columnId+" .result").length === 0) {
                $("#global-search #"+columnId+" h2").append('<span class="result"></span>');
            }
            $("#global-search #"+columnId+" .result").html(count);
            hits.data("count", count);
            if (count > 3) {
                hits.siblings(".show-all").removeClass("few-results");
                if(!$("#global-search #"+columnId+" .results").hasClass('show-all')){
					hits.html(hits.data("pattern").replace("{}", 3).replace("{}", count));
            	}else {
					hits.html(hits.data("pattern").replace("{}", count).replace("{}", count));
                }
            } else {
                hits.siblings(".show-all").addClass("few-results");
                hits.html(hits.data("pattern").replace("{}", count).replace("{}", count));
            }
        }
    }

    function thumbnailTemplate(result, className) {
        var template = '<article class="' + className + '">'
                        + '<a href="' + result.path + '.html">'
                            + '<header>';
        if (result.thumbnail) {
            template += '<img src="' + result.thumbnail + '.transform/search/image.jpg" alt="'+result.alt+'">';
        }
        template += '<h3>' + result.title + '</h3>'
                            + '</header>'
                            + result.description
                        + '</a>'
                        + '</artile>';
        return template;
    }

    function siteTemplate(result) {
        return thumbnailTemplate(result, "site");
    }

    function vacancyTemplate(result) {
        var template = '<article class="vacancy">'
                        + '<a href="' + result.path + '.html">'
                            + '<h3>' + result.city + '</h3>'
                            + result.jobTitle
                        + '</a>'
                     + '</article>';
        return template;
    }

    function articleTemplate(result) {
        var template = '<article class="article">'
                            + '<a href="' + result.path + '.html">'
                            + '<div class="date">' + result.date + '</div>'
                            + '<h3>'+result.title+'</h3>'
                        + '</a>'
                        + '</article>';
        return template;
    }

    function populateColumn(columnId, data, templateFunction, append) {
        if(!data || !data.results) return;
        var objects = data.results;
        if(data.hasMoreResults){
            $('#global-search #'+columnId+' .loadmore').addClass('show')
        }else{
            $('#global-search #'+columnId+' .loadmore').removeClass('show')
        }

        if (objects.length == 0 && $('#global-search #'+columnId).find('.no-result').length != 0) return

        if (!append) {
            $('#global-search #'+columnId+' .results').html('');
        }
        $.each(objects, function(key, val) {
            $('#global-search #'+columnId+' .results').append(templateFunction(val));
        });
        resultCount(columnId);
    }

    function getCount(columnId) {
        var test = $('#'+columnId+' .hits').data("count");
        if ($.isNumeric(test)) {
            return test;
        } else {
            return 0;
        }
    }


	var currentQuery = "";

    function search(query, offset, type) {
        $("#global-search").addClass("show-results");
        if (!offset) {
            resetSearch();
        }
        if (query != '') {
            $(".loading-indicator").css("display", "inline-block");
        }
        var ifAuthor = $("body").hasClass("author") ? "wcmmode=disabled&" : "";
        var url = "/content/statoil/searchEngine.html?"+ifAuthor+"language=" + $("#search-language").val() + "&query=" + encodeURIComponent(query);
        if (offset) {
            url = url + '&offset='+offset;
        }
        if (type) {
            url = url + '&searchType='+type;
        }

        currentQuery = query;
        // search tracking code end
        var request = $.getJSON(url, function (data) {
            populateColumn("site", data.site, siteTemplate, offset != null);
            populateColumn("news", data.news, articleTemplate, offset != null);
            var count = getCount("site")+getCount("news")
            if (count > 0) {
                $(".search-field-results").html($(".search-field-results").data("pattern").replace("{}", count));
            } else {
                $(".search-field-results").html($('.no-result').first().html());
            }
            $(".loading-indicator").css("display", "none");
        });
        request.fail(function(){
            populateColumn("site", {results: []}, siteTemplate);
            populateColumn("news", {results: []}, articleTemplate);
            $(".search-field-results").html($('.no-result').first().html());
            $(".loading-indicator").css("display", "none");
        })
    }

    function commonListeners () {
        $(".show-all").click(function() {
            var results = $(this).parent().siblings(".results-container");
            results.toggleClass("show-all");
            $(this).toggleClass("active");
            var hits = $(this).siblings(".hits");
            if (results.hasClass("show-all")) {
                hits.html(hits.data("pattern").replace("{}", hits.data("count")).replace("{}", hits.data("count")));
            } else {
                hits.html(hits.data("pattern").replace("{}", 3).replace("{}", hits.data("count")));
            }
        });
    }

    function mobileSearchListener() {
        $("#search-field").keypress(function(e) {
            if(e.which == 13) {
                var url = "/content/statoil/search.html?language=" + $("#search-language").val() + "&q=" + escapeQuery($("#search-field").val());
                window.location.replace(url);
                $("#search-field").blur();
                $("#global-search").addClass("show-results");
            }
        });
        $('#global-search .column').each(function(){
			var type = this.id;
            var $t = $(this);
            var showmorebutton = $t.find('.search-meta .show-all')
            $t.find('.loadmore').click(function(){
                var items = $t.find('.results').children().length;
				search(currentQuery, items, type)
                var searchResults = $t.find(".results article");
                searchResults[searchResults.length - 1].querySelector('a').focus();
                if(!showmorebutton.hasClass('active')) showmorebutton.click();
            });
        })
        $("#search-field").focus(function() {
            $("#global-search").removeClass("show-results");
        });
        commonListeners();
    }

    $(window).on("load", function() {
        var searchInput = $("#search-field");
        mobileSearchListener();
        var searchQuery= searchInput.val();
        if(typeof searchQuery !== "undefined"){
            var strLength= searchQuery.length;
	    searchInput.focus();
	    searchInput[0].setSelectionRange(strLength, strLength);
            search(escapeQuery(searchQuery));
            }
    });

    function escapeQuery(query){
        return query.replace(new RegExp("'", 'g'), "\\'");
    }
})();
