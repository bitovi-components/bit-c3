/*bit-c3@0.0.7#data/name/viewmodel*/
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
        updateName: function () {
            var chart = this.attr('chart'), newName = {};
            newName[this.attr('key')] = this.attr('value');
            chart.data.names(newName);
        }
    });
});