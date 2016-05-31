(function(braintree) {
    'use strict';

    var braintreeConfig = {
        environment: braintree.Environment.Sandbox,
        merchantId: '8xhgyn2zy3ny3psm',
        publicKey: 'kf57wgq46vy3t9y5',
        privateKey: '91aedd740dffc19c3b07aef63cf0350f'
    };

    var paypalConfig = {
        'mode': 'sandbox',
        'client_id': 'AZ_2wOUufkyhTlJyJeLOeR6bEeHEQ8ff_GmpDb_h3mp1IgfaEsSKM_aoC9OxGR3b0iHxuWQjhOGfJu7F',
        'client_secret': 'EEx612vMYZraCNhXPVdtUCxFWEg6ueFlIUb57mm4yLCZSjBeLVJAkqR98OtSWpC6sUMZxYI7T5wpwalM'
    };

    var mySqlConfig = {
        host: "localhost",
        user: "root",
        password: "",
        database: "hq-payments"
    };

    module.exports = {
        'braintreeConfig': braintreeConfig,
        'paypalConfig': paypalConfig,
        'mySqlConfig': mySqlConfig
    };
})(require('braintree'));
