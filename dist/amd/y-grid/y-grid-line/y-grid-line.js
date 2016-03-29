/*bit-c3@0.0.6#y-grid/y-grid-line/y-grid-line*/
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
    var YGridLineVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-y-grid-line',
        viewModel: YGridLineVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('lines', this.element.parent().scope().attr('lines'));
                this.viewModel.addToLines();
            },
            removed: function () {
                this.viewModel.removeFromLines();
            },
            '{viewModel} value': function () {
                this.viewModel.updateLines();
            },
            '{viewModel} text': function () {
                this.viewModel.updateLines();
            },
            '{viewModel} position': function () {
                this.viewModel.updateLines();
            },
            '{viewModel} class': function () {
                this.viewModel.updateLines();
            },
            '{viewModel} gridLine': function () {
                console.log('changed - update?');
            }
        }
    });
    module.exports = YGridLineVM;
});