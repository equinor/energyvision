;(function(){
    var $ = window.jQuery;
    // function to update calendar UTC timezone to local timezone
    $(function() {
        var calendarItems = $(".calendar-item");
        if(calendarItems.length > 0){
            $.each(calendarItems, function(index, item) {
            var dateTimeElement = $(item).find(".time");
                if($(dateTimeElement).data("timeNotSpecified") !== true){
                    var start = $(dateTimeElement).data("startDateTime");
                    var end = $(dateTimeElement).data("endDateTime");
                    var startDate = new Date(start);
                    var endDate = new Date(end);
                    var localStartTime = moment(startDate).format("HH:mm");
                    var localEndTime = moment(endDate).format("HH:mm");
                    var localTimeZone = moment.tz(moment.tz.guess()).zoneAbbr();
                    var formattedTime = localStartTime +" - "+ localEndTime +" "+ localTimeZone;
                    $(dateTimeElement.children('.event-start-end-time')[0]).text(formattedTime);
                }
            });
        }
    });
})();