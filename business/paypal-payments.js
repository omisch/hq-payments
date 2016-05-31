(function(paypal, dao) {
    'use strict';

    function pay(paymentData, callback) {
        paymentData = completePaymentData(paymentData);
        paypal.createCreditCardPayment(paymentData, processCreatedPayment);

        function processCreatedPayment(result, paymentResult) {
            if (result.success) {
                dao.createPayment(paymentData, paymentResult, callback);
            } else {
                callback(result);
            }
        }
    }

    function completePaymentData(paymentData) {
        var names = paymentData.creditCardHolderName.split(' ');
        paymentData.firstName = names[0];
        paymentData.lastName = names[1];

        var expirationDates = paymentData.creditCardExpiration.split('/');
        paymentData.expirationMonth = parseInt(expirationDates[0], 10);
        paymentData.expirationYear = parseInt(expirationDates[1], 10);

        paymentData.paypalPrice = parseInt(paymentData.price, 10);

        if (paymentData.creditCardType === 'American Express') {
            paymentData.paypalCreditCardType = 'amex';
        } else {
            paymentData.paypalCreditCardType = paymentData.creditCardType.toLowerCase();
        }

        return paymentData;
    }

    module.exports = {
        'pay': pay
    };
})(require('../integration/paypal'), require('../integration/payment-dao'));
