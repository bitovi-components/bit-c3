/*bit-c3@0.0.6#data/group/group*/
'use strict';
var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
};
var can = _interopRequire(require('can'));
var GroupVM = _interopRequire(require('./viewmodel.js'));
can.Component.extend({
    tag: 'bit-c3-data-group',
    viewModel: GroupVM,
    events: {
        inserted: function (viewModel, ev) {
            this.viewModel.attr('groups', this.element.parent().scope().attr('groups'));
            this.viewModel.addToGroups();
        },
        removed: function () {
            this.viewModel.removeFromGroups();
        },
        '{viewModel} valueSerialized': function () {
            this.viewModel.updateGroup();
        }
    }
});
module.exports = GroupVM;