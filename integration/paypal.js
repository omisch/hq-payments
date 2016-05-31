(function(config, paypal) {
    'use strict';

    paypal.configure(config.paypalConfig);

    function createCreditCardPayment(paymentData, callback) {
        var createPaymentJson = createJson(paymentData);

        paypal.payment.create(createPaymentJson, function(error, payment) {
            if (error) {
                console.log("Paypal Error", error);
                callback({'success': false, message: 'error while communicating with paypal'}, payment);
            } else {
                console.log("Create Payment Response", payment);
                callback({'success': true}, payment);
            }
        });
    }

    function createJson(paymentData) {
        return {
            "intent": "sale",
            "payer": {
                "payment_method": "credit_card",
                "funding_instruments": [{
                    "credit_card": {
                        "type": paymentData.paypalCreditCardType,
                        "number": "4124138105007679",
                        "expire_month": paymentData.expirationMonth,
                        "expire_year": paymentData.expirationYear,
                        "cvv2": paymentData.ccv,
                        "first_name": paymentData.firstName,
                        "last_name": paymentData.lastName
                    }
                }]
            },
            "transactions": [{
                "amount": {
                    "total": paymentData.paypalPrice,
                    "currency": paymentData.currency
                },
                "description": "hq-payments"
            }]
        };
    }

    module.exports = {
        'createCreditCardPayment': createCreditCardPayment
    };
})(require('./config'), require('paypal-rest-sdk'));
