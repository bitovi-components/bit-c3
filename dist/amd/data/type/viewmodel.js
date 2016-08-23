/*bit-c3@0.1.2#data/type/viewmodel*/
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
            }
        },
        'key': null,
        'updateType': function updateType() {
            var chart = this.attr('chart');
            chart.transform(this.attr('value'), this.attr('key'));
        }
    });
});