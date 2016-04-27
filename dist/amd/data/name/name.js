/*bit-c3@0.1.0#data/name/name*/
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
    var NameVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-data-name',
        viewModel: NameVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateName();
            },
            '{viewModel} value': function () {
                this.viewModel.updateName();
            }
        }
    });
    module.exports = NameVM;
});