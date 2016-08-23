/*bit-c3@0.1.2#viewmodel*/
define([
    'exports',
    'module',
    'can/legacy'
], function (exports, module, _canLegacy) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({ chart: null });
});