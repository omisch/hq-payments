var expect = require('chai').expect;

describe('creditCardTypes', function () {
    var currencies = require('../business/credit-card-types');

    it('provides required creditCardTypes', function() {
        var currencyList = currencies.list();
        expect(currencyList.indexOf("American Express")).to.not.equal(-1);
        expect(currencyList.indexOf("VISA")).to.not.equal(-1);
        expect(currencyList.indexOf("Mastercard")).to.not.equal(-1);
    });
});