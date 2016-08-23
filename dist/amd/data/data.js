/*bit-c3@0.1.2#data/data*/
define([
    'exports',
    'module',
    'can/legacy',
    './viewmodel',
    'can-jquery',
    'can-util/dom/data'
], function (exports, module, _canLegacy, _viewmodel, _canJquery, _canUtilDomData) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _DataVM = _interopRequireDefault(_viewmodel);
    var _$ = _interopRequireDefault(_canJquery);
    var _domData = _interopRequireDefault(_canUtilDomData);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data',
        leakScope: true,
        viewModel: _DataVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.viewModel.attr('chart', _domData['default'].get.call((0, _$['default'])(this.element).parent()[0], 'viewModel').attr('chart'));
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