/*bit-c3@0.1.2#data/group/group*/
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
    var _GroupVM = _interopRequireDefault(_viewmodel);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data-group',
        leakScope: true,
        viewModel: _GroupVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.element = $(this.element);
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