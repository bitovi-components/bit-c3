/*bit-c3@0.1.3#data/group/group*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _can = require('can');
var _can2 = _interopRequireDefault(_can);
var _viewmodel = require('./viewmodel.js');
var _viewmodel2 = _interopRequireDefault(_viewmodel);
_can2['default'].Component.extend({
    tag: 'bit-c3-data-group',
    viewModel: _viewmodel2['default'],
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
exports['default'] = _viewmodel2['default'];
module.exports = exports['default'];