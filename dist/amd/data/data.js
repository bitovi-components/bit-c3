/*bit-c3@0.1.3#data/data*/
define([
    'exports',
    'module',
    'can',
    './viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can2 = _interopRequireDefault(_can);
    var _DataVM = _interopRequireDefault(_viewmodel);
    _can2['default'].Component.extend({
        tag: 'bit-c3-data',
        viewModel: _DataVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.loadAllAttributesOnChart();
            },
            '{viewModel} change': function viewModelChange(viewModel, ev, attr, type, newVal, oldVal) {
                this.viewModel.loadAttributeOnChart(attr);
            },
            removed: function removed() {
                this.viewModel.removeAttr('chart');
            }
        }
    });
    module.exports = _DataVM['default'];
});