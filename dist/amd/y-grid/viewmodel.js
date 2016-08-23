/*bit-c3@0.1.2#y-grid/viewmodel*/
define([
    'exports',
    'module',
    'can/legacy',
    'can/map/define'
], function (exports, module, _canLegacy, _canMapDefine) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
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
});