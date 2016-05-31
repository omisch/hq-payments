var expect = require('chai').expect;

describe('currencies', function () {
    var currencies = require('../business/currencies');

    it('provides required currencies', function() {
        var currencyList = currencies.list();
        expect(currencyList.indexOf("USD")).to.not.equal(-1);
        expect(currencyList.indexOf("EUR")).to.not.equal(-1);
        expect(currencyList.indexOf("THB")).to.not.equal(-1);
        expect(currencyList.indexOf("HKD")).to.not.equal(-1);
        expect(currencyList.indexOf("SGD")).to.not.equal(-1);
        expect(currencyList.indexOf("AUD")).to.not.equal(-1);
    });
});
