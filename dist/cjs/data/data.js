/*bit-c3@0.1.2#data/data*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _canLegacy = require('can/legacy');
var _canLegacy2 = _interopRequireDefault(_canLegacy);
var _viewmodel = require('./viewmodel.js');
var _viewmodel2 = _interopRequireDefault(_viewmodel);
var _canJquery = require('can-jquery');
var _canJquery2 = _interopRequireDefault(_canJquery);
var _canUtilDomData = require('can-util/dom/data/data');
var _canUtilDomData2 = _interopRequireDefault(_canUtilDomData);
_canLegacy2['default'].Component.extend({
    leakScope: true,
    tag: 'bit-c3-data',
    leakScope: true,
    viewModel: _viewmodel2['default'],
    events: {
        inserted: function inserted(viewModel, ev) {
            this.viewModel.attr('chart', _canUtilDomData2['default'].get.call((0, _canJquery2['default'])(this.element).parent()[0], 'viewModel').attr('chart'));
            this.viewModel.loadAllAttributesOnChart();
        },
        '{viewModel} change': function viewModelChange(viewModel, ev, attr, type, newVal, oldVal) {
            this.viewModel.loadAttributeOnChart(attr);
        },
        removed: function removed() {
            this.viewModel.removeAttr('chart');
        }
    }
});
exports['default'] = _viewmodel2['default'];
module.exports = exports['default'];