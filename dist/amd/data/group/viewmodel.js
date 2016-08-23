/*bit-c3@0.1.2#data/group/viewmodel*/
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
});