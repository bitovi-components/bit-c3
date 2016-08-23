/*bit-c3@0.1.2#y-grid/y-grid-line/y-grid-line*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _canLegacy = require('can/legacy');
var _canLegacy2 = _interopRequireDefault(_canLegacy);
var _viewmodel = require('./viewmodel.js');
var _viewmodel2 = _interopRequireDefault(_viewmodel);
_canLegacy2['default'].Component.extend({
    leakScope: true,
    tag: 'bit-c3-y-grid-line',
    leakScope: true,
    viewModel: _viewmodel2['default'],
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
exports['default'] = _viewmodel2['default'];
module.exports = exports['default'];