import can from "can/legacy";
import TypeVM from "./viewmodel";

/**
 * @module {can.Component} bit-c3.components.bit-c3-data-type <bit-c3-data-type>
 * @parent bit-c3.components 5
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data type element
 *
 * @signature '<bit-c3-data-type />'
 * @param {String} key Key for the data column.
 * @param {String} value Type for the data column.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <bit-c3>
 *   <bit-c3-data>
 *     <bit-c3-data-type key="dataSet1" value="spline" />
 *   </bit-c3-data>
 * </bit-c3>
 * ```
 */
can.Component.extend({
	tag: "bit-c3-data-type",
	viewModel: TypeVM,
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

export default TypeVM;