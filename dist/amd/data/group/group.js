/*bit-c3@0.1.3#data/group/group*/
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
    var _GroupVM = _interopRequireDefault(_viewmodel);
    _can2['default'].Component.extend({
        tag: 'bit-c3-data-group',
        viewModel: _GroupVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.viewModel.attr('groups', this.element.parent().scope().attr('groups'));
                this.viewModel.addToGroups();
            },
            removed: function removed() {
                this.viewModel.removeFromGroups();
            },
            '{viewModel} valueSerialized': function viewModelValueSerialized() {
                this.viewModel.updateGroup();
            }
        }
    });
    module.exports = _GroupVM['default'];
});