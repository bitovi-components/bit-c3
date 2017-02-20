/*bit-c3@0.1.3#data/viewmodel*/
define([
    'exports',
    'module',
    'can',
    'can/map/define'
], function (exports, module, _can, _canMapDefine) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    module.exports = _can2['default'].Map.extend({
        define: {
            chart: {
                type: '*',
                value: null
            },
            groupsSerialized: {
                get: function get() {
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
        loadAllAttributesOnChart: function loadAllAttributesOnChart() {
            var _this = this;
            this.each(function (item, key) {
                _this.loadAttributeOnChart(key, item);
            });
        },
        loadAttributeOnChart: function loadAttributeOnChart(attribute, value) {
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