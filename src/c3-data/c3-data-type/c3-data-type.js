import can from "can";
import C3DataTypeVM from "./viewmodel";

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-data.c3-data-type <c3-data-type>
 * @parent c3-chart.reference.c3-chart.c3-data 2
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data type element
 *
 * @signature '<c3-data-type />'
 * @param {String} key Key for the data column.
 * @param {String} value Type for the data column.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart>
 *   <c3-data>
 *     <c3-data-type key="dataSet1" value="spline" />
 *   </c3-data>
 * </c3-chart>
 * ```
 */
can.Component.extend({
	tag: "c3-data-type",
	viewModel: C3DataTypeVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.updateType();
		},
		"{viewModel} value": function() {
			this.viewModel.updateType();
		}
	}
});

export default C3DataTypeVM;