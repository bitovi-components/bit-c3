/*bit-c3@0.1.3#data/column/column*/
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
    tag: 'bit-c3-data-column',
    viewModel: _viewmodel2['default'],
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
exports['default'] = _viewmodel2['default'];
module.exports = exports['default'];