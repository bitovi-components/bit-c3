/*bit-c3@0.1.2#data/column/column*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _canLegacy = require('can/legacy');
var _canLegacy2 = _interopRequireDefault(_canLegacy);
var _viewmodel = require('./viewmodel.js');
var _viewmodel2 = _interopRequireDefault(_viewmodel);
var _jquery = require('jquery');
var _jquery2 = _interopRequireDefault(_jquery);
var _canUtilDomData = require('can-util/dom/data/data');
var _canUtilDomData2 = _interopRequireDefault(_canUtilDomData);
_canLegacy2['default'].Component.extend({
    leakScope: true,
    tag: 'bit-c3-data-column',
    viewModel: _viewmodel2['default'],
    events: {
        inserted: function inserted(viewModel, ev) {
            this.viewModel.attr('chart', _canUtilDomData2['default'].get.call((0, _jquery2['default'])(this.element).parent()[0], 'viewModel').attr('chart'));
            this.viewModel.updateColumn();
        },
        beforeremove: function beforeremove() {
            if (_canUtilDomData2['default'].get.call((0, _jquery2['default'])(this.element).parent()[0], 'viewModel').attr('chart')) {
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