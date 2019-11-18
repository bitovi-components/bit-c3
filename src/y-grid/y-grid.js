import { Component, viewModel as canViewModel } from "can";
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
Component.extend({
	tag: "bit-c3-y-grid",
	ViewModel: YGridVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.chart = canViewModel(this.element.parentElement).chart;
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