(function() {
    function findId(elm) {
        return $(elm).closest("div.list-container").attr("id");
    }

    function findPath(id) {
        return $("#"+id).data("nodepath");
    }

    function appendList(id) {
        $("#" + id).addClass("loading");
        var searchResults = $("#"+id).find("ul.list-container li");
        searchResults[searchResults.length - 1].querySelector('a').focus();
        $.ajax({url: buildQuery(id, true), success: function(result){
            var list = $(result).find('ul.list-container li');
            $("#"+ id + " ul.list-container").append(list).trigger('updateList');
            var more = $(result).find('.more-results');
            if(more.length != 0) {
                $("#" + id + " .more-results-btn").removeAttr("disabled");
            }
            refreshTags(id);
            $("#" + id).removeClass("loading");
            window.initLazy();
            ModalModule.initialize(); // to initialize MagnificPopup on new panel links added to the list
        }});
    }

    function buildQuery(id, withOffset) {
        var offset = 0;
        if (withOffset) {
            var offset = getOffset(id);
        }

        var query = findPath(id) + ".html?offset="+offset;

        var queryParam = getQueryParameter(id);
        if (queryParam) {
            query += queryParam;
        }

        var yearParam = getYearParameter(id);
        if (yearParam) {
            query += yearParam;
        }

        var sortParam = getSortParameter(id);
        if (sortParam) {
            query += sortParam;
        }

        return query;
    }

    function getOffset(id) {
        return $("#" + id + " .list-item").length;
    }

    function getYearParameter(id) {
        var yearParam = $("#" + id + " .list-year-filter").val();
        if ($.isNumeric(yearParam)) {
            return "&year=" + yearParam;
        }
    }

    function getQueryParameter(id) {
        var query = $("#"+id + " .queried").data("query");
        if (query && query.length != 0) {
            setQuery(id, query);
            return "&query=" + encodeURIComponent(query);
        }
    }

    function getSortParameter(id) {
        var sortParam = $("#" + id + " .list-sort-option").val();
        if (sortParam == "title") {
            return '&sort=title';
        }
    }

    function getListData(result) {
        return $(result).find('ul.list-container li');
    }

    function setMoreButton(id, result) {
        var more = $(result).find('.more-results');
        if(more.length == 0) {
            $("#"+ id + " .more-results-btn").attr("disabled", true);
        } else {
            $("#"+ id + " .more-results-btn").removeAttr("disabled");
        }
    }

    function replaceList(id, list) {
        $("#" + id).addClass("loading");
        $.ajax({url: buildQuery(id, false), success: function(result){
            $("#" + id + " ul.list-container").html(getListData(result));
            setMoreButton(id, result);
            refreshTags(id);
            $("#" + id).removeClass("loading");
            ModalModule.initialize(); // to initialize MagnificPopup on panel links as the list is changed.
        }});
    }

    function setQuery(id, query) {
        var queryElm = $("#"+id + " .queried");
        if (!query || query.length == 0) {
            queryElm.text("");
            queryElm.data("query", "");
        } else {
            queryElm.data("query", query);
            queryElm.text(queryElm.data("template").replace("{}", query));
        }

    }

    function allTags(id) {
        var tags = new Array();
        $("#" + id + " .tags-filter .tag-filter").each(function(idx, val) {
            tags.push($(val).data("tag"));
        });
        return tags;
    }

    function hasTagsFilter(id) {
        return $("#" + id + " .tags-filter").length > 0;
    }

    function countTags(id) {
        $("#" + id + " .tag-filter .tag-filter-count").data("count", 0);
        $("#" + id + " .tag-filter .tag-filter-count").html(0);
        $("#"+id + " ul.list-container li:not(.hidden-item)").each(function(idx, val) {
            var tags = getTags(val);
            for (var i = 0; i < tags.length; i++) {
                var countElm = $("#" + id + " .tag-filter[data-tag='"+tags[i]+"'] .tag-filter-count");
                var count = countElm.data("count");
                count+=1;
                countElm.data("count", count);
                countElm.html(count.toString());
            }
        });
    }

    function getTags(liElm) {
        var tags = $(liElm).data("tags");
        if (tags) {
            return tags.split(";");
        }
        return new Array();
    }

    function refreshTags(id) {
        if (!hasTagsFilter(id)) {
            return;
        }
        var tags = allTags(id);
        var currentTags = new Array();
        $("#"+id + " ul.list-container li").each(function(idx, val) {
            var itemTags = getTags(val);
            for (var i = 0; i < itemTags.length; i++) {
                var currentItemTag = itemTags[i];
                currentTags.push(currentItemTag);
                if (tags.indexOf(currentItemTag) < 0) {
                    $("#" + id + " .tags-filter").append('<button class="tag-filter btn medium tools-inverted narrow tag inrow" data-tag="'+currentItemTag+'">'+currentItemTag+'<span class="tag-filter-count"></span></button>');
                    $("#" + id + " .tag-filter[data-tag='"+currentItemTag+"']").click(function() {
                        $(this).toggleClass("is-active");
                        filterTags(findId(this));
                    });
                    tags.push(currentItemTag);
                }
            }
        });
        for (var i = 0; i < tags.length; i++) {
            if (currentTags.indexOf(tags[i]) == -1) {
                $("#" + id + " .tag-filter[data-tag='"+tags[i]+"']").remove();
            }
        }
        filterTags(id);
    }

    function filterTags(id) {
        var selectedTags = getSelectedTags(id);
        hideItems(id, selectedTags);
        checkMoreButton(id);
        if(isTagCountEnabled()== true)
        	countTags(id);
    }


    function hideItems(id, tags) {
        $("#"+id + " ul.list-container li.list-item").each(function(idx, val) {
            var hide = false;
            var itemTags = getTags(val);
            if (itemTags.length == 0 && tags.length > 0) {
                hide = true;
            } else {
                for (var i = 0; i < tags.length; i++) {
                    if (itemTags.indexOf(tags[i]) == -1) {
                        hide = true;
                    }
                }
            }
            if (hide) {
                $(val).addClass("hidden-item");
            } else {
                $(val).removeClass("hidden-item");
            }
        });

    }

    function checkMoreButton(id) {
        var listItems = Array.from($("#"+id + " ul.list-container li.list-item"));
		var moreBtn = $(".more-results-btn");
        var noResult = $(".no-result-container");
		var checker = 0;
        listItems.forEach(function(item){
            if(item.classList.contains("hidden-item")){
                checker++
            }
        });
        var hiddenAll = checker === listItems.length ? true : false
        if(hiddenAll){
            moreBtn.prop("disabled", true)
            noResult.css("display", "block")
        } else{
            moreBtn.prop("disabled", false)
            noResult.css("display", "none")
        }
    }

    function getSelectedTags(id) {
        var selectedTags = new Array();
        $("#" + id + " .tag-filter.is-active").each(function(idx, val) {
            selectedTags.push($(val).data("tag"));
        });

        return selectedTags;
    }

    $(document).ready(function() {

        // set sort by date as default and clear search text
        $(".sort-options-container .custom-dropdown .custom-dropdown-items").prop('selectedIndex',0);
        $(".list-search-container .search").val('');
        if(isTagCountEnabled()== true){
            $("ul.list-container").each(function(idx, val) {
               countTags(findId(val));
            });
        }

        $(".more-results-btn").click(function() {
            var currentState = $(this).attr("disabled");
            if (currentState != "disabled") {
                $(this).attr("disabled", "disabled");
            }
            appendList(findId(this));
        });

        $(".list-search-container .search").keypress(function(e) {
            if(e.which == 13) {
                var id = findId(this);
                setQuery(id, $(this).val());
                replaceList(id);
            }
        });

        $(".list-search-container .search").on("search", function(e) {
            if ($(this).val() === "") {
                var id = findId(this);
                setQuery(id, $(this).val());
                replaceList(id);
            }
        });

        $(".list-year-filter").change(function() {
           replaceList(findId(this));
        });

        $(".list-sort-option").change(function() {
           replaceList(findId(this));
        });

        $(".tag-filter").click(function(event) {
            if(event.clientX != 0 && event.clientY != 0) {
                // is not a keyboard event
                $(this).find('.button-focus-catcher').get(0).focus();
            }
            $(this).toggleClass("is-active");
            filterTags(findId(this));
        });
    });

    function isTagCountEnabled() {
        return $('.news-list-container').find('.tags-filter').data('is-tag-count-enabled');
    }

})();
