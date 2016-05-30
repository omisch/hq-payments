(function() {
    'use strict';

    /**
     * @returns {string[]} all supported credit card types
     */
    function list() {
        return ['American Express', 'VISA', 'Maestro'];
    }

    module.exports = {
        'list': list
    };
})();
