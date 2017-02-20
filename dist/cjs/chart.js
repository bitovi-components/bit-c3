/*bit-c3@0.1.3#chart*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _can = require('can');
var _can2 = _interopRequireDefault(_can);
var _d3 = require('d3');
var _d32 = _interopRequireDefault(_d3);
var _c3 = require('c3');
var _c32 = _interopRequireDefault(_c3);
var _chartStache = require('./chart.stache.js');
var _chartStache2 = _interopRequireDefault(_chartStache);
var _viewmodel = require('./viewmodel.js');
var _viewmodel2 = _interopRequireDefault(_viewmodel);
_can2['default'].Component.extend({
    tag: 'bit-c3',
    template: _chartStache2['default'],
    viewModel: _viewmodel2['default'],
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
exports['default'] = _viewmodel2['default'];
module.exports = exports['default'];