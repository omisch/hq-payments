var expect = require('chai').expect;

describe('braintree wrapper', function () {
    var sinon = require('sinon');
    var sandbox = sinon.sandbox.create();

    var braintree = require('braintree');
    var braintreeWrapper = require('../integration/braintree');

    afterEach(function() {
        sandbox.restore();
    });

    it('delegates to braintree', function() {
        // given
        var braintreeGateway = {
            'transaction': {
                'sale': function() {}
            }
        };
        sandbox.stub(braintree, 'connect', function() {
            return braintreeGateway;
        });
        sandbox.spy(braintreeGateway.transaction, 'sale');


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

        braintreeWrapper.createCreditCardPayment(paymentData, function() {});

        // then
        sinon.assert.calledOnce(braintree.connect);
        sinon.assert.calledOnce(braintreeGateway.transaction.sale);
    });
});
