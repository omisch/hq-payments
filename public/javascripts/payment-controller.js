/**
 * Controller for view payment.jade
 */
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
        var inputData = readInputData();

        var validationMessages = validatePaymentData(inputData);
        if (validationMessages.length > 0) {
            showValidationMessages(validationMessages);
        } else {
            hideValidationMessages();
            createPayment(inputData);
        }
    }

    function readInputData() {
        return {
            price: $('#price').val().trim(),
            currency: $('#currency').val(),
            customerName: $('#customerName').val().trim(),
            creditCardType: $('#creditCardType').val(),
            creditCardHolderName: $('#creditCardHolderName').val().trim(),
            creditCardNumber: $('#creditCardNumber').val().trim(),
            creditCardExpiration: $('#creditCardExpiration').val().trim(),
            ccv: $('#ccv').val().trim()
        };
    }

    function createPayment(paymentInput) {
        $.post("/payments", paymentInput, function(result) {
            showCreatePaymentResult(JSON.parse(result));
        });
    }

    function showCreatePaymentResult(result) {
        var message;
        if (result.success) {
            message = 'Transaction successfully completed. Thank you for purchasing hq-payments';
        } else {
            message = 'An error happened while processing your payment: ' + result.message;
        }
        alert(message);
    }

    function validatePaymentData(paymentInput) {
        var validationMessages = [];

        validatePrice();
        validateCustomerName();
        validateCreditCardHolderName();
        validateCreditCardNumber();
        validateCreditCardExpiration();
        validateCCV();

        return validationMessages;

        function validatePrice() {
            if (!paymentInput.price ||
                isNaN(parseInt(paymentInput.price, 10))) {
                validationMessages.push("Please enter a price");
            }
        }

        function validateCustomerName() {
            if (!paymentInput.customerName ||
                paymentInput.customerName.indexOf(' ') === -1) {
                validationMessages.push("Please enter your full name (first name and last name)");
            }
        }

        function validateCreditCardHolderName() {
            if (!paymentInput.creditCardHolderName ||
                paymentInput.creditCardHolderName.indexOf(' ') === -1) {
                validationMessages.push("Please enter the full card holder name (first name and last name)");
            }
        }

        function validateCreditCardNumber() {
            if (!paymentInput.creditCardNumber ||
                isNaN(parseInt(paymentInput.creditCardNumber, 10))) {
                validationMessages.push("Please enter a valid credit card number");
            }
        }

        function validateCreditCardExpiration() {
            if (!paymentInput.creditCardExpiration ||
                paymentInput.creditCardExpiration.indexOf('/') === -1) {
                validationMessages.push("Please enter a credit card expiration date in the format mm/yyyy");
            }
        }

        function validateCCV() {
            if (!paymentInput.ccv ||
                isNaN(parseInt(paymentInput.ccv, 10)) ||
                paymentInput.ccv.length < 3 ||
                paymentInput.ccv.length > 4) {
                validationMessages.push("Please enter a ccv (3-4 digits)");
            }
        }
    }

    function showValidationMessages(messages) {
        hideValidationMessages();
        for (var i=0; i<messages.length; i++) {
            $('#validationMessages').append('<li>' + messages[i] + '</li>');
        }
    }

    function hideValidationMessages() {
        $('#validationMessages').empty();
    }
})();
