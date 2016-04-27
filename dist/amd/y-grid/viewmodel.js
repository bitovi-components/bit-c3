/*bit-c3@0.1.0#y-grid/viewmodel*/
define([
    'exports',
    'module',
    'can',
    'can/map/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            linesSerialized: {
                get: function () {
                    return this.attr('lines').serialize();
                }
            }
        },
        lines: {},
        updateLines: function () {
            var lines = [];
            this.attr('lines').each(function (value, key) {
                lines.push(value);
            });
            this.attr('chart').ygrids(lines);
        }
    });
});