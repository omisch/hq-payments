var expect = require('chai').expect;

describe('paypal payments', function () {
    var sinon = require('sinon');
    var sandbox = sinon.sandbox.create();

    var paypalPayments = require('../business/paypal-payments');
    var paypalWrapper = require('../integration/paypal');
    var paymentDao = require('../integration/payment-dao');

    afterEach(function() {
        sandbox.restore();
    });

    it('delegates to paypal and, if successful, to payment-dao', function() {
        // given
        sandbox.stub(paypalWrapper, 'createCreditCardPayment', function(paymentData, callback) {
            callback({'success': true}, 'test result');
        });
        sandbox.stub(paymentDao, 'createPayment', function(paymentData, result, callback) {
            callback({'success': true});
        });

        // when
        var paymentData = {
            price: '100',
            currency: 'USD',
            customerName: 'John Test',
            creditCardType: 'American Express',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4124138105007679',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };

        paypalPayments.pay(paymentData, function() {});

        // then
        sinon.assert.calledOnce(paypalWrapper.createCreditCardPayment);
        sinon.assert.calledOnce(paymentDao.createPayment);
    });

    it('delegates to paypal and, if not successful, not to payment-dao', function() {
        // given
        sandbox.stub(paypalWrapper, 'createCreditCardPayment', function(paymentData, callback) {
            callback({'success': false}, 'test result');
        });
        sandbox.stub(paymentDao, 'createPayment', function(paymentData, result, callback) {
            callback({'success': true});
        });

        // when
        var paymentData = {
            price: '100',
            currency: 'USD',
            customerName: 'John Test',
            creditCardType: 'American Express',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4124138105007679',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };

        paypalPayments.pay(paymentData, function() {});

        // then
        sinon.assert.calledOnce(paypalWrapper.createCreditCardPayment);
        sinon.assert.callCount(paymentDao.createPayment, 0);
    });
});
