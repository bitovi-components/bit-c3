/*bit-c3@0.0.6#y-grid/viewmodel*/
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