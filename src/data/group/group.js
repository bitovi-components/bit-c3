import can from "can/legacy";
import GroupVM from './viewmodel';

/**
 * @module {can.Component} bit-c3.components.bit-c3-data-group <bit-c3-data-group>
 * @parent bit-c3.components 3
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data group element
 *
 * @signature '<bit-c3-data-group />'
 * @param {Array} value Data keys to be grouped.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <bit-c3>
 *   <bit-c3-data>
 *     <bit-c3-data-group value="['data1', 'data2']" />
 *   </bit-c3-data>
 * </bit-c3>
 * ```
 */
can.Component.extend({
	tag: "bit-c3-data-group",
	viewModel: GroupVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('groups', this.element.parent().scope().attr('groups'));
			this.viewModel.addToGroups();
		},
		removed: function() {
			this.viewModel.removeFromGroups();
		},
		"{viewModel} valueSerialized": function() {
			this.viewModel.updateGroup();
		}
	}
});

export default GroupVM;