import can from "can";
import C3DataColumnVM from './viewmodel'

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-data.c3-data-column <c3-data-column>
 * @parent c3-chart.reference.c3-chart.c3-data 0
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data column element
 *
 * @signature '<c3-data-column />'
 * @param {String} key Key for the data column.
 * @param {Array} value Data values.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart>
 *   <c3-data>
 *     <c3-data-column value="['dataSet1', 1, 2, 3, 2]" />
 *   </c3-data>
 * </c3-chart>
 *   
 * ```
 *
 * ```html
 * <c3-chart>
 *   <c3-data>
 *     <c3-data-column key="dataSet1" value="[1, 2, 3, 2]" />
 *   </c3-data>
 * </c3-chart>
 * ```
 */
can.Component.extend({
	tag: "c3-data-column",
	viewModel: C3DataColumnVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.updateColumn();
		},
		removed: function() {
			this.viewModel.unloadColumn();
		},
		"{viewModel} valueSerialized": function() {
			this.viewModel.updateColumn();
		}
	}
});

export default C3DataColumnVM;