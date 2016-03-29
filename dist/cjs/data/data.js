/*bit-c3@0.0.6#data/data*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var DataVM = _interopRequire(require('./viewmodel.js'));
can.Component.extend({
    tag: 'bit-c3-data',
    viewModel: DataVM,
    events: {
        inserted: function (viewModel, ev) {
            this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
            this.viewModel.loadAllAttributesOnChart();
        },
        '{viewModel} change': function (viewModel, ev, attr, type, newVal, oldVal) {
            this.viewModel.loadAttributeOnChart(attr);
        }
    }
});
module.exports = DataVM;