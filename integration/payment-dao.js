(function(config, mysql) {
    'use strict';

    function createPayment(payment, result, callback) {
        var connection = mysql.createConnection(config.mySqlConfig);

        connection.connect(function(error){
            if (error) {
                console.log(error);
                callback({'success': false, 'message': 'error while connecting to database'});
                return;
            }

            connection.query(
                "INSERT INTO payment (price, currency, customer_name, credit_card_holder_name, " +
                    "credit_card_type, credit_card_number, credit_card_expiration, ccv, provider_result) VALUES " +
                    "('" + payment.price + "', '" + payment.currency + "', '" + payment.customerName +
                    "', '" + payment.creditCardHolderName + "', '" + payment.creditCardType + "', '" +
                    payment.creditCardNumber + "', '" + payment.creditCardExpiration + "', " +
                    payment.ccv + ", '" + JSON.stringify(result) + "')",
                function(error) {
                    if (error) {
                        console.log(error);
                        callback({'success': false, 'message': 'error while accessing database'});
                    } else {
                        callback({'success': true});
                    }
                }
            );
        });
    }

    module.exports = {
        'createPayment': createPayment
    };
})(require('./config'), require('mysql'));
