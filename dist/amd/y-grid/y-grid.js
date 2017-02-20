/*bit-c3@0.1.3#y-grid/y-grid*/
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
    var _YGridVM = _interopRequireDefault(_viewmodel);
    _can2['default'].Component.extend({
        tag: 'bit-c3-y-grid',
        viewModel: _YGridVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
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