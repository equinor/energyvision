;(function(){
    var $ = window.jQuery;
    $(document).ready(function() {
        var $items=$(".filterable");
        var $filters=$(".filter");
        $filters.bind( "click",function(e){
            $(this).toggleClass("active");
            var group = "";
            $filters.each(function(index){
                var currentFilter = $filters[index];
                if($(currentFilter).attr("class").indexOf("active")>-1){
                    var currentGroup = $(currentFilter).data("group");
                    group+=currentGroup+","

                }

            });
            group = group.substring(0,group.length - 1)
            $items.each(function(index){
                var currentItem = $items[index];
                $(currentItem).css("display", "block");
                var data = $(currentItem).data("groups");
                if(data!=null && group.indexOf(data)>=0){
                    $(currentItem).css("display", "block");
                }else{
                    $(currentItem).css("display", "none");

                }
            });
        });

    });
});
