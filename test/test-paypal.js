var expect = require('chai').expect;

describe('paypal wrapper', function () {
    var sinon = require('sinon');
    var sandbox = sinon.sandbox.create();

    var paypal = require('paypal-rest-sdk');
    var paypalWrapper = require('../integration/paypal');

    afterEach(function() {
        sandbox.restore();
    });

    it('delegates to paypal', function() {
        // given
        sandbox.stub(paypal.payment, 'create', function(json, callback) {
            callback({'success': true}, "success payment");
        });

        // when
        var paymentData = {
            price: '100',
            currency: 'EUR',
            customerName: 'John Test',
            creditCardType: 'American Express',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4124138105007679',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };

        paypalWrapper.createCreditCardPayment(paymentData, function() {});

        // then
        sinon.assert.calledOnce(paypal.payment.create);
    });
});
