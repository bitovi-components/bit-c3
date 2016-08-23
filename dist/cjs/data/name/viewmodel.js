/*bit-c3@0.1.2#data/name/viewmodel*/
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
    'updateName': function updateName() {
        var chart = this.attr('chart'), newName = {};
        newName[this.attr('key')] = this.attr('value');
        chart.data.names(newName);
    }
});
module.exports = exports['default'];