/*bit-c3@0.1.2#data/name/viewmodel*/
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
        'updateName': function updateName() {
            var chart = this.attr('chart'), newName = {};
            newName[this.attr('key')] = this.attr('value');
            chart.data.names(newName);
        }
    });
});