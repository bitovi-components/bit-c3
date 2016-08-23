import can from "can/legacy";
import YGridVM from './viewmodel';

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
  leakScope: true,
	tag: "bit-c3-y-grid",
  leakScope: true,
	viewModel: YGridVM,
	events: {
		inserted: function(viewModel, ev) {
			this.element = $(this.element);
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

export default YGridVM;