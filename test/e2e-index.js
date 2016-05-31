var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');

describe('GET /', function() {
    it('respond with html', function(done) {
        request(app)
            .get('/')
            .set('Accept', 'application/html')
            .expect('Content-Type', /html/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                expect(res.text.indexOf("Payment")).to.not.equal(-1);
                expect(res.text.indexOf("Order")).to.not.equal(-1);

                done();
            });
        });
});