var request = require('supertest');
var app = require('../app');

describe('POST /payments', function() {
    it('respond with success for USD and VISA', function(done) {
        var payment = {
            price: '100',
            currency: 'USD',
            customerName: 'John Test',
            creditCardType: 'Visa',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4124138105007679',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };

        this.timeout(15000);
        request(app)
            .post('/payments')
            .send(payment)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({'success': true}, done);
    });

    it('respond with success for THB and VISA', function(done) {
        var payment = {
            price: '100',
            currency: 'THB',
            customerName: 'John Test',
            creditCardType: 'Visa',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4012888888881881',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };

        this.timeout(15000);
        request(app)
            .post('/payments')
            .send(payment)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({'success': true}, done);
    });

    it('respond with error for THB and AMEX', function(done) {
        var payment = {
            price: '100',
            currency: 'THB',
            customerName: 'John Test',
            creditCardType: 'American Express',
            creditCardHolderName: 'John Test',
            creditCardNumber: '4124138105007679',
            creditCardExpiration: '02/2020',
            ccv: '123'
        };

        this.timeout(15000);
        request(app)
            .post('/payments')
            .send(payment)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({'success': false, 'message': 'American Express is only possible to use with USD'}, done);
    });
});