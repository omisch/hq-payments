(function(express, currencies, creditCardTypes) {
    var router = express.Router();

    router.get('/', function(request, response) {
        response.render(
            'payment', {
            'currencies': currencies.list(),
            'creditCardTypes': creditCardTypes.list()
        });
    });

    module.exports = router;

})(require('express'),
   require('../business/currencies'),
   require('../business/credit-card-types'));
