/*bit-c3@0.1.2#chart*/
define([
    'exports',
    'module',
    'can/legacy',
    'd3',
    'c3',
    './chart.stache',
    './viewmodel'
], function (exports, module, _canLegacy, _d3, _c3, _chartStache, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _d32 = _interopRequireDefault(_d3);
    var _c32 = _interopRequireDefault(_c3);
    var _template = _interopRequireDefault(_chartStache);
    var _ChartVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3',
        leakScope: true,
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
            beforeremove: function beforeremove() {
                this.viewModel.attr('chart', this.viewModel.attr('chart').destroy());
            }
        }
    });
    module.exports = _ChartVM['default'];
});