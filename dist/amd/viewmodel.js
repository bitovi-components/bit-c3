/*bit-c3@0.0.7#viewmodel*/
define([
    'exports',
    'module',
    'can'
], function (exports, module, _can) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({ chart: null });
});