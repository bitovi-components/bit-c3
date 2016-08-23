/*bit-c3@0.1.2#data/name/name*/
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
    var _NameVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data-name',
        leakScope: true,
        viewModel: _NameVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateName();
            },
            '{viewModel} value': function viewModelValue() {
                this.viewModel.updateName();
            }
        }
    });
    module.exports = _NameVM['default'];
});