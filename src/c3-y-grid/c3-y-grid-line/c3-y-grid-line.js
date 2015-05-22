import can from "can";
import C3YGridLineVM from './viewmodel';

/**
 * @module {can.Component} c3-chart.reference.c3-chart.c3-y-grid.c3-y-grid-line <c3-y-grid-line>
 * @parent c3-chart.reference.c3-chart.c3-y-grid 0
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart Y grid line element
 *
 * @signature '<c3-y-grid value="" text="" position="" class="" />'
 * @param {Number} value Value where the grid line will start from
 * @param {String} text Label for the grid line
 * @param {String} position Position of the grid line
 * @param {String} class Class name applied to the label
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart>
 *   <c3-y-grid>
 *     <c3-y-grid-line value="0" text="Break Even" class="label-0" position="middle" />
 *   </c3-y-grid>
 * </c3-chart>
 * ```
 */
can.Component.extend({
	tag: "c3-y-grid-line",
	viewModel: C3YGridLineVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('lines', this.element.parent().scope().attr('lines'));
			this.viewModel.addToLines();
		},
		removed: function() {
			this.viewModel.removeFromLines();
		},
		"{viewModel} value": function() {
			this.viewModel.updateLines();
		},
		"{viewModel} text": function() {
			this.viewModel.updateLines();
		},
		"{viewModel} position": function() {
			this.viewModel.updateLines();
		},
		"{viewModel} class": function() {
			this.viewModel.updateLines();
		},
		"{viewModel} gridLine": function() {
			console.log('changed - update?');
		}
	}
});

export default C3YGridLineVM;