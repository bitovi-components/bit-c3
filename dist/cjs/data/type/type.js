/*bit-c3@0.1.2#data/type/type*/
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
    tag: 'bit-c3-data-type',
    leakScope: true,
    viewModel: _viewmodel2['default'],
    events: {
        inserted: function inserted(viewModel, ev) {
            this.element = $(this.element);
            this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
            this.viewModel.updateType();
        },
        '{viewModel} value': function viewModelValue() {
            this.viewModel.updateType();
        }
    }
});
exports['default'] = _viewmodel2['default'];
module.exports = exports['default'];