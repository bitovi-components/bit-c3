/*bit-c3@0.1.0#chart*/
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
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var d3 = _interopRequire(_d3);
    var c3 = _interopRequire(_c3);
    var template = _interopRequire(_chartStache);
    var ChartVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3',
        template: template,
        viewModel: ChartVM,
        events: {
            inserted: function (viewModel, ev) {
                var rootElement = ev.target, graphBaseElement = d3.select(rootElement.getElementsByClassName('chart-container')[0]), chart = c3.generate({
                        bindto: graphBaseElement,
                        data: { columns: [] }
                    });
                this.viewModel.attr('chart', chart);
            },
            removed: function () {
                this.viewModel.attr('chart', this.viewModel.attr('chart').destroy());
            }
        }
    });
    module.exports = ChartVM;
});