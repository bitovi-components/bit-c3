/*bit-c3@0.1.0#y-grid/y-grid*/
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
    var YGridVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-y-grid',
        viewModel: YGridVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateLines();
            },
            removed: function () {
                this.viewModel.updateLines();
            },
            '{viewModel} linesSerialized': function () {
                this.viewModel.updateLines();
            }
        }
    });
    module.exports = YGridVM;
});