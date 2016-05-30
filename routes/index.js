var express = require('express');
var router = express.Router();

var currencies = require('../business/currencies');
var creditCardTypes = require('../business/credit-card-types.js');

router.get('/', function(request, response) {
  response.render(
      'index', {
          'currencies': currencies.list(),
          'creditCardTypes': creditCardTypes.list()
      });
});

module.exports = router;
