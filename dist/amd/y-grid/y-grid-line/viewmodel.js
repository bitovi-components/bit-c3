/*bit-c3@0.1.2#y-grid/y-grid-line/viewmodel*/
define([
    'exports',
    'module',
    'can/legacy',
    'can/map/define',
    '../../lib/lib'
], function (exports, module, _canLegacy, _canMapDefine, _bitC3LibLib) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    module.exports = _can['default'].Map.extend({
        define: {
            'gridLine': {
                get: function get() {
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
        'key': null,
        'addToLines': function addToLines() {
            var key = (0, _bitC3LibLib.randomString)(50);
            this.attr('key', key);
            this.attr('lines').attr(key, this.attr('gridLine'));
        },
        'updateLines': function updateLines() {
            this.attr('lines').attr(this.attr('key'), this.attr('gridLine'));
        },
        'removeFromLines': function removeFromLines() {
            this.attr('lines').removeAttr(this.attr('key'));
        }
    });
});