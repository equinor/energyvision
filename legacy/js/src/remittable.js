;(function(){
    var $ = window.jQuery;
    if ($('.remit-table').length) {
        $(function() {
            $.ajax({
                datatype: "json",
                type: "get",
                url: location.protocol + '//' + location.host + "/services/remit"
            }).done(function (data) {
                var template = $("#remit-item-template").html();

                data.Data.List = data.Data.List.map(function (element) {
                    element.CurrentMessage.IsUpdated = element.CurrentMessage.Version > 1;
                    return element;
                });

                var plannedData = data.Data.List.filter(function (element) {
                    return element.CurrentMessage.IsPlannedEvent;
                });

                var plannedHtml = Mustache.render(template, plannedData);
                $("#planned-events > .remit-table").append(plannedHtml);

                var unplannedData = data.Data.List.filter(function (element) {
                    return !element.CurrentMessage.IsPlannedEvent;
                });

                var unplannedHtml = Mustache.render(template, unplannedData);
                $("#unplanned-events > .remit-table").append(unplannedHtml);

                $('.accordion-title').click(function() {
                    var text = $(this).text() == 'View history' ? 'Hide history' : 'View history';
                    $(this).text(text);
                });

                FoundationModule.initialize();
            }).fail(function (jqXHR, textStatus, errorThrown ) {
            });
        });
    }
})();