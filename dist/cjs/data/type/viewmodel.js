/*bit-c3@0.1.2#data/type/viewmodel*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _canLegacy = require('can/legacy');
var _canLegacy2 = _interopRequireDefault(_canLegacy);
require('can/map/define/define');
exports['default'] = _canLegacy2['default'].Map.extend({
    define: {
        chart: {
            type: '*',
            value: null
        }
    },
    'key': null,
    'updateType': function updateType() {
        var chart = this.attr('chart');
        chart.transform(this.attr('value'), this.attr('key'));
    }
});
module.exports = exports['default'];