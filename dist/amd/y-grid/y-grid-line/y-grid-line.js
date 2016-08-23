/*bit-c3@0.1.2#y-grid/y-grid-line/y-grid-line*/
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
    var _YGridLineVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-y-grid-line',
        leakScope: true,
        viewModel: _YGridLineVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
                this.viewModel.attr('lines', this.element.parent().scope().attr('lines'));
                this.viewModel.addToLines();
            },
            removed: function removed() {
                this.viewModel.removeFromLines();
            },
            '{viewModel} value': function viewModelValue() {
                this.viewModel.updateLines();
            },
            '{viewModel} text': function viewModelText() {
                this.viewModel.updateLines();
            },
            '{viewModel} position': function viewModelPosition() {
                this.viewModel.updateLines();
            },
            '{viewModel} class': function viewModelClass() {
                this.viewModel.updateLines();
            },
            '{viewModel} gridLine': function viewModelGridLine() {
                console.log('changed - update?');
            }
        }
    });
    module.exports = _YGridLineVM['default'];
});