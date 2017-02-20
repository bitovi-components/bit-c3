/*bit-c3@0.1.3#y-grid/viewmodel*/
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
        },
        linesSerialized: {
            get: function get() {
                return this.attr('lines').serialize();
            }
        }
    },
    lines: {},
    updateLines: function updateLines() {
        var lines = [];
        this.attr('lines').each(function (value, key) {
            lines.push(value);
        });
        this.attr('chart').ygrids(lines);
    }
});
module.exports = exports['default'];