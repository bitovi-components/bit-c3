/*bit-c3@0.0.7#lib/lib*/
define(['exports'], function (exports) {
    'use strict';
    var randomString = exports.randomString = function (length) {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
    Object.defineProperty(exports, '__esModule', { value: true });
});