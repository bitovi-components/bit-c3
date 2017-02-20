/*bit-c3@0.1.3#y-grid/y-grid-line/y-grid-line*/
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
    var _YGridLineVM = _interopRequireDefault(_viewmodel);
    _can2['default'].Component.extend({
        tag: 'bit-c3-y-grid-line',
        viewModel: _YGridLineVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
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