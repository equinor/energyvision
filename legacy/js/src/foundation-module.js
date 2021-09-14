var FoundationModule = (function () {

    function initialize() {
        $(document).foundation();

        Foundation.Abide.defaults.validators['checkbox_group_required'] =
        function (el, required, parent) {
            var group = parent.closest('.checkbox-group');
             var checked = group.find(':checked').length;
             if (checked >= 1) {
                group.find('.form-error').removeClass('is-visible');
                group.closest('label').show();
                return true;
             } else {
                group.closest('label').hide();
                group.find('.form-error').addClass('is-visible');
                return false;
             }
        };

        Foundation.Abide.defaults.validators['select_required'] =
        function (el, required, parent) {
            var formInput = parent.closest('.form-input');

            if (el.val()) {
                formInput.find('.form-error').removeClass('is-visible');
                formInput.closest('label').show();
                formInput.find('.selectric-wrapper').removeClass('is-invalid-input');
                formInput.find('.selectric-items').removeClass('is-invalid-input');

                return true;
            } else {
                formInput.closest('label').hide();
                formInput.find('.form-error').addClass('is-visible');
                formInput.find('.selectric-wrapper').addClass('is-invalid-input');
                formInput.find('.selectric-items').addClass('is-invalid-input');

                return false;
            }
        };
    }

    return {
        initialize: initialize
    };

})();
