/*bit-c3@0.0.6#y-grid/y-grid-line/viewmodel*/
define([
    'exports',
    'module',
    'can',
    'can/map/define',
    '../../lib/lib'
], function (exports, module, _can, _canMapDefine, _bitC3LibLib) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var randomString = _bitC3LibLib.randomString;
    module.exports = can.Map.extend({
        define: {
            gridLine: {
                get: function () {
                    return {
                        value: this.attr('value'),
                        text: this.attr('text'),
                        position: this.attr('position'),
                        'class': this.attr('class')
                    };
                }
            }
        },
        lines: null,
        value: null,
        text: null,
        position: null,
        'class': null,
        key: null,
        addToLines: function () {
            var key = randomString(50);
            this.attr('key', key);
            this.attr('lines').attr(key, this.attr('gridLine'));
        },
        updateLines: function () {
            this.attr('lines').attr(this.attr('key'), this.attr('gridLine'));
        },
        removeFromLines: function () {
            this.attr('lines').removeAttr(this.attr('key'));
        }
    });
});