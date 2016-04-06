/*bit-c3@0.0.7#data/type/type*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var TypeVM = _interopRequire(require('./viewmodel.js'));
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