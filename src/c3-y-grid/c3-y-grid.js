import can from "can";
import "./c3-y-grid-line/";
import C3YGridVM from './viewmodel';

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-y-grid <c3-y-grid>
 * @parent c3-chart.reference.c3-chart 1
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart Y grid element
 *
 * @signature '<c3-y-grid></c3-y-grid>'
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart>
 *   <c3-y-grid></c3-y-grid>
 * </c3-chart>
 * ```
 */
can.Component.extend({
	tag: "c3-y-grid",
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