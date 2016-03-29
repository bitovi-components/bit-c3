/*bit-c3@0.0.6#y-grid/y-grid*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var YGridVM = _interopRequire(require('./viewmodel.js'));
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