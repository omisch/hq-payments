(function(braintreePayments, paypalPayments) {
    'use strict';

    /**
     * @param paymentData example: {
     *      price: '100',
     *      currency: 'USD',
     *      customerName: 'John Test',
     *      creditCardType: 'American Express',
     *      creditCardHolderName: 'John Test',
     *      creditCardNumber: '4124138105007679',
     *      creditCardExpiration: '02/2020',
     *      ccv: '123'
     *  }
     */
    function pay(paymentData, callback) {
        var invalidPaymentDataMessage = validatePaymentData(paymentData);
        if (invalidPaymentDataMessage) {
            callback({'success': false, 'message': invalidPaymentDataMessage});
            return;
        }

        if (isPaypalPayment(paymentData)) {
            paypalPayments.pay(paymentData, callback);
        } else {
            braintreePayments.pay(paymentData, callback);
        }
    }

    function validatePaymentData(paymentData) {
        if (paymentData.creditCardType === 'American Express' &&
            paymentData.currency !== 'USD') {
            return 'American Express is only possible to use with USD';
        } else {
            return null;
        }
    }

    function isPaypalPayment(paymentData) {
        return isPaypalCreditCardType(paymentData.creditCardType) ||
               isPaypalCurrency(paymentData.currency);
    }

    function isPaypalCreditCardType(creditCardType) {
        return creditCardType === 'American Express';
    }

    function isPaypalCurrency(currency) {
        return currency === 'USD' ||
               currency === 'EUR' ||
               currency === 'AUD';
    }

    module.exports = {
        'pay': pay
    };
})(require('./braintree-payments'), require('./paypal-payments'));
