/*bit-c3@0.1.3#data/name/name*/
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
    var _NameVM = _interopRequireDefault(_viewmodel);
    _can2['default'].Component.extend({
        tag: 'bit-c3-data-name',
        viewModel: _NameVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
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