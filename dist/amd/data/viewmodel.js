/*bit-c3@0.0.7#data/viewmodel*/
define([
    'exports',
    'module',
    'can',
    'can/map/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    module.exports = can.Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            groupsSerialized: {
                get: function () {
                    return this.attr('groups').serialize();
                }
            }
        },
        groups: {},
        standardAttributes: [
            'url',
            'json',
            'columns',
            'rows',
            'classes',
            'categories',
            'axes',
            'colors',
            'types',
            'unload',
            'done'
        ],
        loadAllAttributesOnChart: function () {
            var _this = this;
            this.each(function (item, key) {
                _this.loadAttributeOnChart(key, item);
            });
        },
        loadAttributeOnChart: function (attribute, value) {
            if (value === undefined) {
                value = this.attr(attribute);
            }
            if (attribute.indexOf('.') !== -1) {
                attribute = attribute.substr(0, attribute.indexOf('.'));
                value = this.attr(attribute);
            }
            var chart = this.attr('chart');
            switch (true) {
            case attribute === 'groupsSerialized' || attribute === 'groups':
                var groups = [];
                this.attr('groups').each(function (value, key) {
                    groups.push(value);
                });
                chart.groups(groups);
                break;
            case attribute === 'type':
                chart.transform(value);
                break;
            case attribute === 'chart':
            case attribute === 'standardAttributes':
                break;
            case attribute === 'names':
                chart.data.names(value);
                break;
            case this.attr('standardAttributes').indexOf(attribute) !== -1:
                var loadVal = {};
                loadVal[attribute] = value;
                chart.load(loadVal);
                break;
            default:
                console.warn('The', attribute, 'property cannot be updated');
                break;
            }
        }
    });
});