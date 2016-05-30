(function() {
    'use strict';

    $(function() {
        registerEventHandlers();
    });

    function registerEventHandlers() {
        $('#submit-payment').click(function() {
            onSubmitPayment();
        });
    }

    function onSubmitPayment() {
        createPayment({
            price: $('#price').val(),
            currency: $('#currency').val(),
            customerName: $('#customerName').val(),
            creditCardType: $('#creditCardType').val(),
            creditCardHolderName: $('#creditCardHolderName').val(),
            creditCardNumber: $('#creditCardNumber').val(),
            creditCardExpiration: $('#creditCardExpiration').val(),
            ccv: $('#ccv').val()
        });
    }

    function createPayment(paymentInput) {
        $.post("/payments", paymentInput, function(result) {
            showCreatePaymentResult(JSON.parse(result));
        });
    }

    function showCreatePaymentResult(result) {
        alert(result.success);
    }
})();
