/*bit-c3@0.1.2#y-grid/viewmodel*/
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