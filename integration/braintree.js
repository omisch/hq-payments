(function(config, braintree) {
    'use strict';

    function createCreditCardPayment(paymentData, callback) {
        var gateway = braintree.connect(config.braintreeConfig);

        gateway.transaction.sale({
            amount: paymentData.price,
            creditCard: {
                cardholderName: paymentData.creditCardHolderName,
                cvv: paymentData.ccv,
                expirationDate: paymentData.creditCardExpiration,
                number: paymentData.creditCardNumber
            }, // TODO do not know how to set currency
           options: {
                submitForSettlement: true
            }
        }, function(error, result) {
            if (error) {
                console.log('braintree-err', error);
                callback({'success': false, message: 'error while communicating with braintree'}, result);
            } else {
                console.log('braintree-result', result);
                callback({'success': true}, result);
            }
        });
    }

    module.exports = {
        'createCreditCardPayment': createCreditCardPayment
    };
})(require('./config'), require('braintree'));
