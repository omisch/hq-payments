var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render(
      'index', {
          'currencies': ['USD', 'EUR', 'THB', 'HKD', 'SGD', 'AUD']
      });
});

module.exports = router;
