/*bit-c3@0.0.7#chart*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var d3 = _interopRequire(require('d3'));
var c3 = _interopRequire(require('c3'));
var template = _interopRequire(require('./chart.stache.js'));
var ChartVM = _interopRequire(require('./viewmodel.js'));
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