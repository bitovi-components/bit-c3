/*bit-c3@0.1.3#data/type/viewmodel*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _can = require('can');
var _can2 = _interopRequireDefault(_can);
require('can/map/define/define');
exports['default'] = _can2['default'].Map.extend({
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