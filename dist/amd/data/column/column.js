/*bit-c3@0.0.6#data/column/column*/
define([
    'exports',
    'module',
    'can',
    './viewmodel'
], function (exports, module, _can, _viewmodel) {
    'use strict';
    var _interopRequire = function (obj) {
        return obj && obj.__esModule ? obj['default'] : obj;
    };
    var can = _interopRequire(_can);
    var ColumnVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-data-column',
        viewModel: ColumnVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateColumn();
            },
            removed: function () {
                this.viewModel.unloadColumn();
            },
            '{viewModel} valueSerialized': function () {
                this.viewModel.updateColumn();
            }
        }
    });
    module.exports = ColumnVM;
});