/*bit-c3@0.0.6#data/column/viewmodel*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
require('can/map/define/define');
module.exports = can.Map.extend({
    define: {
        chart: {
            type: '*',
            value: null
        },
        valueSerialized: {
            get: function (val) {
                return this.attr('value') && this.attr('value').serialize();
            }
        }
    },
    value: null,
    key: null,
    dequeueKey: function () {
        var value = this.attr('value') && this.attr('value').attr(), key = this.attr('key');
        if (value !== null && (key === null || value.length && value[0] === key)) {
            this.attr('key', value.shift());
        }
        return value;
    },
    updateColumn: function () {
        var value = this.dequeueKey(this.attr('value')), key = this.attr('key'), chart = this.attr('chart'), pushing = [key].concat(value);
        if (value && value.length) {
            chart.load({ columns: [pushing] });
        } else {
            this.unloadColumn();
        }
    },
    unloadColumn: function () {
        this.attr('chart').unload({ ids: this.attr('key') });
    }
});