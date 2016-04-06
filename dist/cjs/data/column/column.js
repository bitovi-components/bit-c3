/*bit-c3@0.0.7#data/column/column*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var ColumnVM = _interopRequire(require('./viewmodel.js'));
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