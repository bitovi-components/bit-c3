/*bit-c3@0.1.2#data/type/type*/
define([
    'exports',
    'module',
    'can/legacy',
    './viewmodel'
], function (exports, module, _canLegacy, _viewmodel) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _TypeVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data-type',
        leakScope: true,
        viewModel: _TypeVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateType();
            },
            '{viewModel} value': function viewModelValue() {
                this.viewModel.updateType();
            }
        }
    });
    module.exports = _TypeVM['default'];
});