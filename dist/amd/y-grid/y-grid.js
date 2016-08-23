/*bit-c3@0.1.2#y-grid/y-grid*/
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
    var _YGridVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-y-grid',
        leakScope: true,
        viewModel: _YGridVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateLines();
            },
            removed: function removed() {
                this.viewModel.updateLines();
            },
            '{viewModel} linesSerialized': function viewModelLinesSerialized() {
                this.viewModel.updateLines();
            }
        }
    });
    module.exports = _YGridVM['default'];
});