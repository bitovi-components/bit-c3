/*bit-c3@0.0.7#data/group/viewmodel*/
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
            valueSerialized: {
                get: function () {
                    return this.attr('value').serialize();
                }
            }
        },
        groups: null,
        key: null,
        value: null,
        addToGroups: function () {
            var key = randomString(50);
            this.attr('key', key);
            this.attr('groups').attr(key, this.attr('value'));
        },
        updateGroup: function () {
            this.attr('groups').attr(this.attr('key'), this.attr('value'));
        },
        removeFromGroups: function () {
            this.attr('groups').removeAttr(this.attr('key'));
        }
    });
});