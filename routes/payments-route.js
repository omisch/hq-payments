(function(express, payments) {
    'use strict';

    var router = express.Router();

    router.post('/', function(request, response) {
        payments.pay(request.body, function(result) {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(result));
        });
    });

    module.exports = router;
})(require('express'), require('../business/payments'));
