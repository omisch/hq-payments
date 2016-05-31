(function(braintree, dao) {
    'use strict';

    function pay(paymentData, callback) {
        braintree.createCreditCardPayment(paymentData, processCreatedPayment);

        function processCreatedPayment(result, paymentResult) {
            if (result.success) {
                dao.createPayment(paymentData, paymentResult, callback);
            } else {
                callback(result);
            }
        }
    }

    module.exports = {
        'pay': pay
    };
})(require('../integration/braintree'), require('../integration/payment-dao'));
