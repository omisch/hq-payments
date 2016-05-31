var expect = require('chai').expect;

describe('payment-dao', function () {
    var sinon = require('sinon');
    var sandbox = sinon.sandbox.create();

    var dao = require('../integration/payment-dao');
    var mySql = require('mysql');

    afterEach(function() {
        sandbox.restore();
    });

    it('connects and queries with mySql', function() {
        // given
        var connection = {
            'connect': function(callback) {
                callback();
            },
            'query': function(query, callback) {
                callback();
            }
        };

        sandbox.stub(mySql, 'createConnection', function() {
            return connection;
        });
        sandbox.spy(connection, 'connect');
        sandbox.spy(connection, 'query');

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

        dao.createPayment(paymentData, "test result", function() {});

        // then
        sinon.assert.calledOnce(mySql.createConnection);
        sinon.assert.calledOnce(connection.connect);
        sinon.assert.calledOnce(connection.query);
    });
});
