/*bit-c3@0.1.3#data/name/viewmodel*/
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
            }
        },
        'key': null,
        'updateName': function updateName() {
            var chart = this.attr('chart'), newName = {};
            newName[this.attr('key')] = this.attr('value');
            chart.data.names(newName);
        }
    });
});