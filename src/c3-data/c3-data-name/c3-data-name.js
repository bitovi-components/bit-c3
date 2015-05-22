import can from "can";
import C3DataNameVM from './viewmodel';

/**
 * @module {can.Component} c3-chart.components.c3-data-name <c3-data-name>
 * @parent c3-chart.components 4
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data name element
 *
 * @signature '<c3-data-name />'
 * @param {String} key Key for the data column.
 * @param {String} value Name for the data column.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart>
 *   <c3-data>
 *     <c3-data-name key="dataSet1" value="Data Set 1" />
 *   </c3-data>
 * </c3-chart>
 * ```
 */
can.Component.extend({
	tag: "c3-data-name",
	viewModel: C3DataNameVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.updateName();
		},
		"{viewModel} value": function() {
			this.viewModel.updateName();
		}
	}
});

export default C3DataNameVM;