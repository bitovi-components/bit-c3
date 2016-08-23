/*bit-c3@0.1.2#data/column/column*/
define([
    'exports',
    'module',
    'can/legacy',
    './viewmodel',
    'jquery',
    'can-util/dom/data'
], function (exports, module, _canLegacy, _viewmodel, _jquery, _canUtilDomData) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _can = _interopRequireDefault(_canLegacy);
    var _ColumnVM = _interopRequireDefault(_viewmodel);
    var _$ = _interopRequireDefault(_jquery);
    var _domData = _interopRequireDefault(_canUtilDomData);
    _can['default'].Component.extend({
        leakScope: true,
        tag: 'bit-c3-data-column',
        viewModel: _ColumnVM['default'],
        events: {
            inserted: function inserted(viewModel, ev) {
                this.viewModel.attr('chart', _domData['default'].get.call((0, _$['default'])(this.element).parent()[0], 'viewModel').attr('chart'));
                this.viewModel.updateColumn();
            },
            beforeremove: function beforeremove() {
                if (_domData['default'].get.call((0, _$['default'])(this.element).parent()[0], 'viewModel').attr('chart')) {
                    this.viewModel.unloadColumn();
                }
            },
            '{viewModel} valueSerialized': function viewModelValueSerialized() {
                this.viewModel.updateColumn();
            }
        }
    });
    module.exports = _ColumnVM['default'];
});