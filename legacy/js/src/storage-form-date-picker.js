;(function(){
    var $ = window.jQuery;
    var storageRequestDatePickerInit = function () {
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        var checkin = $('#snStorageRequest-dateFrom').fdatepicker({
            onRender: function (date) {
                return date.valueOf() < now.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date)
                newDate.setDate(newDate.getDate());
                checkout.update(newDate);
            }
            checkin.hide();
            $('#snStorageRequest-dateTo')[0].focus();
        }).data('datepicker');
        var checkout = $('#snStorageRequest-dateTo').fdatepicker({
            onRender: function (date) {
                return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            checkout.hide();
        }).data('datepicker');
    }
    window.storageRequestDatePickerInit = storageRequestDatePickerInit;
    storageRequestDatePickerInit();
})();