import can from "can/legacy";
import YGridLineVM from './viewmodel';

/**
 * @module {can.Component} bit-c3.components.bit-c3-y-grid-line <bit-c3-y-grid-line>
 * @parent bit-c3.components 7
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart Y grid line element
 *
 * @signature '<bit-c3-y-grid value="" text="" position="" class="" />'
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
 * <bit-c3>
 *   <bit-c3-y-grid>
 *     <bit-c3-y-grid-line value="0" text="Break Even" class="label-0" position="middle" />
 *   </bit-c3-y-grid>
 * </bit-c3>
 * ```
 */
can.Component.extend({
	tag: "bit-c3-y-grid-line",
  leakScope: true,
	viewModel: YGridLineVM,
	events: {
		inserted: function(viewModel, ev) {
			this.element = $(this.element);
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

export default YGridLineVM;