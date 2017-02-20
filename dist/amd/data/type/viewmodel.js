/*bit-c3@0.1.3#data/type/viewmodel*/
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
        'updateType': function updateType() {
            var chart = this.attr('chart');
            chart.transform(this.attr('value'), this.attr('key'));
        }
    });
});