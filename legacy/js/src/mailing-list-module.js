var MailingListModule = (function () {

    function initialize() {

        $("#sfSubscriptionForm").on('formvalid.zf.abide', function(ev,frm) {
			var widgetId = frm.attr('data-recaptcha-id');
			grecaptcha.execute(parseInt(widgetId));
        });

        $("#sfSubscriptionForm").on('submit', function(event) {
            event.preventDefault();
        });

    }

    return {
        initialize: initialize
    };

})();

function onSubscriptionFormSubmit(token) {
    handleMailingListSubscribeRequest();
}

function handleMailingListSubscribeRequest(){
    $('#sfSubmitButton').progressTimed(2);
    $('#sfSubmitButton').attr('data-finished',$('#sfSubmitButton').attr('data-success'));
    $.ajax({
        datatype: 'json',
        data: $("#sfSubscriptionForm").serialize(),
        type: 'post',
        url: '/services/MailingListSubscribe'
    }).done(function (data) {
		$('#sfSubmitButton').attr('data-finished',$('#sfSubmitButton').data("succeeded"));
		setTimeout(function() {
            $('#sfSubmitButton').attr('data-finished',$('#sfSubmitButton').attr('data-initial'));
            $('#sfSubscriptionForm')[0].reset();
		}, 2000);
        grecaptcha.reset();

    }).fail(function (jqXHR, textStatus, errorThrown ) {
        $('#sfSubmitButton').attr('data-finished', $('#sfSubmitButton').data("failed"));
        grecaptcha.reset();
    });
}



