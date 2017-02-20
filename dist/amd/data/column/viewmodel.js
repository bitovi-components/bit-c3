/*bit-c3@0.1.3#data/column/viewmodel*/
define([
    'exports',
    'module',
    'can',
    'can/map/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    module.exports = _can2['default'].Map.extend({
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
});