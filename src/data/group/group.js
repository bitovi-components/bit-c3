import can from "can";
import C3DataGroupVM from './viewmodel';

/**
 * @module {can.Component} c3-chart.components.c3-data-group <c3-data-group>
 * @parent c3-chart.components 3
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data group element
 *
 * @signature '<c3-data-group />'
 * @param {Array} value Data keys to be grouped.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart>
 *   <c3-data>
 *     <c3-data-group value="['data1', 'data2']" />
 *   </c3-data>
 * </c3-chart>
 * ```
 */
can.Component.extend({
	tag: "c3-data-group",
	viewModel: C3DataGroupVM,
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

export default C3DataGroupVM;