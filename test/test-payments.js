describe('payments', function () {
    var expect = require('chai').expect;
    var sinon = require('sinon');
    var sandbox = sinon.sandbox.create();

    var payments = require('../business/payments');
    var paypalPayments = require('../business/paypal-payments');
    var braintreePayments = require('../business/braintree-payments');

    afterEach(function() {
        sandbox.restore();
    });

    it('returns error for EUR and AMEX', function() {
        var paymentData = createTestPaymentDataAmexEur();
        payments.pay(paymentData, function(result) {
            expect(result.success).to.equal(false);
        });
    });

    it('calls paypal-payments for USD and AMEX', function() {
        // given
        sandbox.stub(paypalPayments, 'pay', function(paymentData, callback) {
            callback({'success': true});
        });
        sandbox.stub(braintreePayments, 'pay', function(paymentData, callback) {
            callback({'success': false});
        });

        // when
        var paymentData = createTestPaymentDataAmexUsd();
        payments.pay(paymentData, function(result) {
            expect(result.success).to.equal(true);
        });

        // then
        sinon.assert.calledOnce(paypalPayments.pay);
        sinon.assert.calledWith(paypalPayments.pay, paymentData);
        sinon.assert.callCount(braintreePayments.pay, 0);
    });

    it('calls braintree-payments for THB and VISA', function() {
        // given
        sandbox.stub(paypalPayments, 'pay', function(paymentData, callback) {
            callback({'success': false});
        });
        sandbox.stub(braintreePayments, 'pay', function(paymentData, callback) {
            callback({'success': true});
        });

        // when
        var paymentData = createTestPaymentDataVisaThb();
        payments.pay(paymentData, function(result) {
            expect(result.success).to.equal(true);
        });

        // then
        sinon.assert.calledOnce(braintreePayments.pay);
        sinon.assert.calledWith(braintreePayments.pay, paymentData);
        sinon.assert.callCount(paypalPayments.pay, 0);
    });

    function createTestPaymentDataAmexUsd() {
        return {
            price: '100',
            currency: 'USD',
            customerName: 'John Test',
            creditCardType: 'American Express',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4124138105007679',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };
    }

    function createTestPaymentDataAmexEur() {
        return {
            price: '100',
            currency: 'EUR',
            customerName: 'John Test',
            creditCardType: 'American Express',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4124138105007679',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };
    }

    function createTestPaymentDataVisaThb() {
        return {
            price: '100',
            currency: 'THB',
            customerName: 'John Test',
            creditCardType: 'Visa',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4124138105007679',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };
    }
});
