/*bit-c3@0.1.0#data/type/type*/
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
    var TypeVM = _interopRequire(_viewmodel);
    can.Component.extend({
        tag: 'bit-c3-data-type',
        viewModel: TypeVM,
        events: {
            inserted: function (viewModel, ev) {
                this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
                this.viewModel.updateType();
            },
            '{viewModel} value': function () {
                this.viewModel.updateType();
            }
        }
    });
    module.exports = TypeVM;
});