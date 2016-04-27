/*bit-c3@0.1.0#data/type/viewmodel*/
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
            }
        },
        key: null,
        updateType: function () {
            var chart = this.attr('chart');
            chart.transform(this.attr('value'), this.attr('key'));
        }
    });
});