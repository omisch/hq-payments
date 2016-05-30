var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
  response.send(JSON.stringify({success: request.body.creditCardType }));
});

module.exports = router;
