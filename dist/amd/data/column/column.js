/*bit-c3@0.1.3#data/column/column*/
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
    var _ColumnVM = _interopRequireDefault(_viewmodel);
    _can2['default'].Component.extend({
        tag: 'bit-c3-data-column',
        viewModel: _ColumnVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateColumn();
            },
            removed: function removed() {
                if (this.element.parent().scope().attr('chart')) {
                    this.viewModel.unloadColumn();
                }
            },
            '{viewModel} valueSerialized': function viewModelValueSerialized() {
                this.viewModel.updateColumn();
            }
        }
    });
    module.exports = _ColumnVM['default'];
});