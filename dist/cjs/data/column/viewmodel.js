/*bit-c3@0.1.2#data/column/viewmodel*/
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
        valueSerialized: {
            get: function get(val) {
                return this.attr('value') && this.attr('value').serialize();
            }
        }
    },
    'value': null,
    'key': null,
    'dequeueKey': function dequeueKey() {
        var value = this.attr('value') && this.attr('value').attr(), key = this.attr('key');
        if (value !== null && (key === null || value.length && value[0] === key)) {
            this.attr('key', value.shift());
        }
        return value;
    },
    'updateColumn': function updateColumn() {
        var value = this.dequeueKey(this.attr('value')), key = this.attr('key'), chart = this.attr('chart'), pushing = [key].concat(value);
        if (value && value.length) {
            chart.load({ columns: [pushing] });
        } else {
            this.unloadColumn();
        }
    },
    'unloadColumn': function unloadColumn() {
        this.attr('chart').unload({ ids: this.attr('key') });
    }
});
module.exports = exports['default'];