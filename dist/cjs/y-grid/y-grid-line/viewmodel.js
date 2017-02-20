/*bit-c3@0.1.3#y-grid/y-grid-line/viewmodel*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _can = require('can');
var _can2 = _interopRequireDefault(_can);
require('can/map/define/define');
var _bitC3LibLib = require('../../lib/lib.js');
exports['default'] = _can2['default'].Map.extend({
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
module.exports = exports['default'];