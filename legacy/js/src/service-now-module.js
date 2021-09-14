var ServiceNowModule = (function () {
    var $ = window.jQuery;
    function initialize() {
        initializeForm('CareerFair');
        initializeForm('ContactUs');
        initializeForm('OrderReports');
        initializeForm('Sponsorships');
        initializeForm('StorageRequest');
        initializeForm('JobVacancies');
    }

    function initializeForm(formName) {
        var form = '#' + formName;
        $(form).on('formvalid.zf.abide', function(ev,frm) {
			var widgetId = frm.attr('data-recaptcha-id');
			grecaptcha.execute(parseInt(widgetId));
        });

        $(form).on('submit', function(event) {
          event.preventDefault();
        });
    }

    return {
        initialize: initialize
    };

})();

function onContactUsSubmit(token) {
    var formName = "ContactUs";
    var form = '#' + formName;
    handleServiceNowRequest(form, formName);
}

function onCareerFairSubmit(token) {
    var formName = "CareerFair";
    var form = '#' + formName;
    handleServiceNowRequest(form, formName);
}

function onOrderReportsSubmit(token) {
    var formName = "OrderReports";
    var form = '#' + formName;
    handleServiceNowRequest(form, formName);
}

function onSponsorshipSubmit(token) {
    var formName = "Sponsorships";
    var form = '#' + formName;
    handleServiceNowRequest(form, formName);
}

function onStorageRequestSubmit(token) {
    var formName = "StorageRequest";
    var form = '#' + formName;
    handleServiceNowRequest(form, formName);
}


function onJobVacanciesSubmit(token) {
    var formName = "JobVacancies";
    var form = '#' + formName;
    handleServiceNowRequest(form, formName);
}

function handleServiceNowRequest(form, formName){
    var formButton = form + ' .progress-button';
    $(formButton).progressTimed(2);
    $(formButton).attr('data-finished',$(formButton).attr('data-success'));
    $.ajax({
        datatype: 'json',
        data: $(form).serialize(),
        type: 'post',
        url: '/services/ServiceNow' + formName
    }).done(function (data) {
        $(formButton).attr('data-finished', $(formButton).data('succeeded'));
		setTimeout(function() {
		$(formButton).attr('data-finished',$(formButton).attr('data-initial'));
		$(form)[0].reset();
        $(form + ' select').prop('selectedIndex', 0).selectric('refresh');
		}, 2000);
        grecaptcha.reset();
    }).fail(function (jqXHR, textStatus, errorThrown ) {
        $(formButton).attr('data-finished', $(formButton).data('failed'));
        grecaptcha.reset();
            });

}
