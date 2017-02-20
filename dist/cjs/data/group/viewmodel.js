/*bit-c3@0.1.3#data/group/viewmodel*/
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
        'valueSerialized': {
            get: function get() {
                return this.attr('value').serialize();
            }
        }
    },
    'groups': null,
    'key': null,
    'value': null,
    'addToGroups': function addToGroups() {
        var key = (0, _bitC3LibLib.randomString)(50);
        this.attr('key', key);
        this.attr('groups').attr(key, this.attr('value'));
    },
    'updateGroup': function updateGroup() {
        this.attr('groups').attr(this.attr('key'), this.attr('value'));
    },
    'removeFromGroups': function removeFromGroups() {
        this.attr('groups').removeAttr(this.attr('key'));
    }
});
module.exports = exports['default'];