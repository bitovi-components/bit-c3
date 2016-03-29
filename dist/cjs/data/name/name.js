/*bit-c3@0.0.6#data/name/name*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var NameVM = _interopRequire(require('./viewmodel.js'));
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