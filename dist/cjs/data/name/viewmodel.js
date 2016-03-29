/*bit-c3@0.0.6#data/name/viewmodel*/
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
    updateName: function () {
        var chart = this.attr('chart'), newName = {};
        newName[this.attr('key')] = this.attr('value');
        chart.data.names(newName);
    }
});