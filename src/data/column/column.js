import Component from "can-component";
import ColumnVM from './viewmodel';
import canViewModel from 'can-view-model';

/**
 * @module {can.Component} bit-c3.components.bit-c3-data-column <bit-c3-data-column>
 * @parent bit-c3.components 2
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data column element
 *
 * @signature '<bit-c3-data-column />'
 * @param {String} key Key for the data column.
 * @param {Array} value Data values.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <bit-c3>
 *   <bit-c3-data>
 *     <bit-c3-data-column value="['dataSet1', 1, 2, 3, 2]" />
 *   </bit-c3-data>
 * </bit-c3>
 *   
 * ```
 *
 * ```html
 * <bit-c3>
 *   <bit-c3-data>
 *     <bit-c3-data-column key="dataSet1" value="[1, 2, 3, 2]" />
 *   </bit-c3-data>
 * </bit-c3>
 * ```
 */
Component.extend({
	tag: "bit-c3-data-column",
	viewModel: ColumnVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.chart = canViewModel(this.element.parentElement).chart;
			this.viewModel.updateColumn();
		},
		removed: function() {
			// check if the chart was not destroyed:
			if (canViewModel(this.element.parentElement).chart){
				this.viewModel.unloadColumn();
			}
		},
		"{viewModel} valueSerialized": function() {
			this.viewModel.updateColumn();
		}
	}
});

export default ColumnVM;