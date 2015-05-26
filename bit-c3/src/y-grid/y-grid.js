import can from "can";
import C3YGridVM from './viewmodel';

/**
 * @module {can.Component} bit-c3.components.bit-c3-y-grid <bit-c3-y-grid>
 * @parent bit-c3.components 6
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart Y grid element
 *
 * @signature '<bit-c3-y-grid></bit-c3-y-grid>'
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <bit-c3>
 *   <bit-c3-y-grid></bit-c3-y-grid>
 * </bit-c3>
 * ```
 */
can.Component.extend({
	tag: "bit-c3-y-grid",
	viewModel: C3YGridVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.updateLines();
		},
		removed: function() {
			this.viewModel.updateLines();
		},
		"{viewModel} linesSerialized": function() {
			this.viewModel.updateLines();
		}
	}
});

export default C3YGridVM;