$(".sites-tablet__button").click(function() {
    $(this).toggleClass("sites-tablet__button--open");
    $(this).next().slideToggle(200);
});
