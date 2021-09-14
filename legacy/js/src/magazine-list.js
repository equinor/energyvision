(function() {
    var $ = window.jQuery;
    function createMagazineList(target) {
        // create shortcut variables for DOM elements used in the filter
        var $target = $(target);
        var filterButtons = $target.find('.magazine-tag-filter-btn');
        var moreButton = $target.find('.magazine-more-results-btn');
        var endpoint  = $target.data('nodepath')

        var resultCountContainer = $target.find('.result-count-text');
        var container = $target.find('.magazine-list-container');
        // Settings and temp values
        var delay = 0;

        var archive = {};
        var list = [];

        var currentTag = "";

        var padding = 24;
        var itemsPrRow = 2;
        var size = {w: 0, h: 0}

        // load and update item list
        var load = function(tag, offset){
            $('span.loading-indicator.fa.fa-spinner.fa-spin').css('display','grid');
			moreButton.hide();
            moreButton.attr("disabled", "disabled");

			currentTag = tag;
            var attr = "";
            if(tag){
                attr += '?filterTag='+tag;
            }
            if(offset){
                attr += (attr == '' ? '?' : '&') + 'offset=' + offset;
            }
            var url = endpoint+ '.html' + attr;
            $.ajax({
            	url: url,
            	success: function(result){
                    var newlist = $(result).find('ul.magazine-list-container li');
                    var items = addToArchive(newlist);
                    var more = $(result).find('.magazine-more-results');
                    $('span.loading-indicator.fa.fa-spinner.fa-spin').css('display','none');
                    moreButton.show();

                    if(offset){
                        items = list.concat(items);
                        container.append(items);
                    }else{
                        container.append(items)
                    }

                    if(more.length != 0) {
                        moreButton.removeAttr('disabled').show();
                    }else{
                        moreButton.hide();
                    }

					var framewait = 0;
                    var forceUpdate = function(){

                        if(framewait == 2){
						    show(items);
                            update();
                            updateResultCount();
                        }else{
							requestAnimationFrame(forceUpdate);
                        }
                        framewait ++;
                    }
                    forceUpdate();
                    window.initLazy();
                    // move focus to the items
                    container.focus();
                }
            });
        };

        var addToArchive = function(list){
            var rtn = [];
            list.each(function(){
                var link = $(this).find('a').attr('href');

                var item = archive[link];
                if(!item){
                    item = archive[link] = this;
                    $(item).find('img').on('load',function(){ update();});
                }
                rtn.push(item);
            })

            return rtn;
        }

        var show = function(newlist){
            var nc = newlist.concat()
            for(var i = 0; i < list.length; i++){
                var hide = true;
                for(var j; j < nc.length; j++){
                    if(nc[j] == list[i]){
                        hide = false;
                        nc.splice(j, 1);
                        break;
                    }
                }
                if(hide){
                	list[i].style.opacity = 0;
                }
            }

            for(var i = 0; i < nc.length; i++){
				nc[i].style.opacity = 1;
            }

            list = newlist;
        }

        var updateResultCount = function(){
            resultCountContainer.css({visibility: currentTag != '' ? 'visible': 'hidden'});

            var tag = currentTag == '' ? '' : $target.find('button[data-tagname="'+currentTag+'"]').data('tagtitle');
            resultCountContainer.find('.result-count').text(list.length);
            resultCountContainer.find('.selected-tag-name').text(tag);
        }

        var update = function() {
            if(list){
                calSize();
                reposition();
            }
        }

        var calSize = function() {
            size.w = 0;
            size.h = 0;

            var containerWidth = container.width();
            for(var i = 0; i < list.length; i ++){
                size.w = Math.max(size.w, list[i].offsetWidth);
                size.h = Math.max(size.h, list[i].offsetHeight);
            }

            itemsPrRow = Math.abs(containerWidth - size.w) < 40 ? 1 : 2;
        }

        var reposition = function() {
            var height = 0;
            for(var i = 0; i < list.length; i ++){
                var x = i % itemsPrRow
                var y = Math.floor(i / itemsPrRow)

                var xp = ((x * size.w)+(padding * x));
                var yp = ((y * size.h)+(padding * y));

                list[i].style.left = xp + "px";
                list[i].style.top = yp + "px";
                height = yp;
            }
            height += size.h;
            container.height(height);
        }

        // init

        filterButtons.click(function(event) {
            var $t = $(this);
            var selected = $t.hasClass('is-active');
            filterButtons.removeClass('is-active');
            // if button is already selected, deselect and load all news items again
            if(selected){
                if(event.clientX != 0 && event.clientY != 0) {
                    $t.find('.button-focus-catcher').get(0).focus();
                }
                load("");
                return
            }
            $t.addClass('is-active');
            load($t.data('tagname'));
        });

        moreButton.click(function () {
            load(currentTag, list.length)
        });
        list = addToArchive(container.find('li'))
        update();
        updateResultCount();
        $(window).resize(function(){
            clearTimeout(delay);
            delay = setTimeout(update, 250);
        });
    }

    $(document).ready(function() {
         $('.magazine-list-component').each(function(){
            createMagazineList(this);
         })
	});
})();