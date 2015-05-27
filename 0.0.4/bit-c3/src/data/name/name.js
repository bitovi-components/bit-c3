import can from "can";
import NameVM from './viewmodel';

/**
 * @module {can.Component} bit-c3.components.bit-c3-data-name <bit-c3-data-name>
 * @parent bit-c3.components 4
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data name element
 *
 * @signature '<bit-c3-data-name />'
 * @param {String} key Key for the data column.
 * @param {String} value Name for the data column.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <bit-c3>
 *   <bit-c3-data>
 *     <bit-c3-data-name key="dataSet1" value="Data Set 1" />
 *   </bit-c3-data>
 * </bit-c3>
 * ```
 */
can.Component.extend({
	tag: "bit-c3-data-name",
	viewModel: NameVM,
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

export default NameVM;