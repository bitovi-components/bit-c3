/*bit-c3@0.1.3#chart*/
define([
    'exports',
    'module',
    'can',
    'd3',
    'c3',
    './chart.stache',
    './viewmodel'
], function (exports, module, _can, _d3, _c3, _chartStache, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    var _d32 = _interopRequireDefault(_d3);
    var _c32 = _interopRequireDefault(_c3);
    var _template = _interopRequireDefault(_chartStache);
    var _ChartVM = _interopRequireDefault(_viewmodel);
    _can2['default'].Component.extend({
        tag: 'bit-c3',
        template: _template['default'],
        viewModel: _ChartVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                var rootElement = ev.target, graphBaseElement = _d32['default'].select(rootElement.getElementsByClassName('chart-container')[0]), chart = _c32['default'].generate({
                        bindto: graphBaseElement,
                        data: { columns: [] }
                    });
                this.viewModel.attr('chart', chart);
            },
            removed: function removed() {
                this.viewModel.attr('chart', this.viewModel.attr('chart').destroy());
            }
        }
    });
    module.exports = _ChartVM['default'];
});