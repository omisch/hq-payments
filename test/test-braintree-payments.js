var expect = require('chai').expect;

describe('braintree payments', function () {
    var sinon = require('sinon');
    var sandbox = sinon.sandbox.create();

    var braintreePayments = require('../business/braintree-payments');
    var braintreeWrapper = require('../integration/braintree');
    var paymentDao = require('../integration/payment-dao');

    afterEach(function() {
        sandbox.restore();
    });

    it('delegates to braintree and, if successful, to payment-dao', function() {
        // given
        sandbox.stub(braintreeWrapper, 'createCreditCardPayment', function(paymentData, callback) {
            callback({'success': true}, 'test result');
        });
        sandbox.stub(paymentDao, 'createPayment', function(paymentData, result, callback) {
            callback({'success': true});
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

        braintreePayments.pay(paymentData, function() {});

        // then
        sinon.assert.calledOnce(braintreeWrapper.createCreditCardPayment);
        sinon.assert.calledOnce(paymentDao.createPayment);
    });

    it('delegates to braintree and, if not successful, not to payment-dao', function() {
        // given
        sandbox.stub(braintreeWrapper, 'createCreditCardPayment', function(paymentData, callback) {
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

        braintreePayments.pay(paymentData, function() {});

        // then
        sinon.assert.calledOnce(braintreeWrapper.createCreditCardPayment);
        sinon.assert.callCount(paymentDao.createPayment, 0);
    });
});
