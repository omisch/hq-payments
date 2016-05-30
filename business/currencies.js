(function() {
    'use strict';

    /**
     * @returns {string[]} all currency codes
     */
    function list() {
        return ['USD', 'EUR', 'THB', 'HKD', 'SGD', 'AUD'];
    }

    module.exports = {
        'list': list
    };
})();
