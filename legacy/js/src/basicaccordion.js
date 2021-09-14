$(".basicaccordion-header").click(function() {
    console.log();
    $(this).parent().toggleClass("basicaccordionitem-open");
    if($(this).parent().hasClass("basicaccordionitem-open")){
    	$(this).attr("aria-expanded", "true");
    }else {
		$(this).removeAttr("aria-expanded");
    }
    $(this).next().slideToggle(200);
    $(this).parent().siblings(".basicaccordionitem").removeClass("basicaccordionitem-open");
    $(this).parent().siblings(".basicaccordionitem").children(".basicaccordion-header").removeAttr("aria-expanded");
    $(this).parent().siblings(".basicaccordionitem").children().next(".basicaccordion-body").slideUp(200);
});
