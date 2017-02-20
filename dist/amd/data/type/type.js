/*bit-c3@0.1.3#data/type/type*/
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
    var _TypeVM = _interopRequireDefault(_viewmodel);
    _can2['default'].Component.extend({
        tag: 'bit-c3-data-type',
        viewModel: _TypeVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
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