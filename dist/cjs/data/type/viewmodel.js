/*bit-c3@0.0.6#data/type/viewmodel*/
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
        }
    },
    key: null,
    updateType: function () {
        var chart = this.attr('chart');
        chart.transform(this.attr('value'), this.attr('key'));
    }
});