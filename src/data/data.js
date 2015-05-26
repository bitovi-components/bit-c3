import can from "can";
import C3DataVM from './viewmodel';

/**
 * @module {can.Component} c3-chart.components.c3-data <c3-data>
 * @parent c3-chart.components 1
 *
 * @author Kyle Gifford
 *
 * @description
 * Chart data element
 *
 * @signature '<c3-data></c3-data>'
 * @param {String} type Type of the graph (see http://c3js.org/reference.html#data-type).
 * @param {Object} names Names of the data elements, keyed by the data Key (see http://c3js.org/reference.html#api-data-names).
 * @param {String} url Load a CSV or JSON file from a URL (see http://c3js.org/reference.html#data-url).
 * @param {Object} json Parse a JSON object for data (see http://c3js.org/reference.html#data-json).
 * @param {Array} columns Load series data from a multidimensional array (see http://c3js.org/reference.html#data-columns).
 * @param {Array} rows Load row data from a multidimensional array (see http://c3js.org/reference.html#data-rows).
 * @param {Object} classes Set custom data classes (http://c3js.org/reference.html#data-classes).
 * @param {Array} categories Set custom X axis categories (see http://c3js.org/reference.html#axis-x-categories).
 * @param {Object} axes Relate data to an axis (see http://c3js.org/reference.html#api-data-axes).
 * @param {Object} colors Set color for data (see http://c3js.org/reference.html#data-colors).
 * @param {Object} types Set types for data series (see http://c3js.org/reference.html#data-types).
 * @param {String|Array} unload Data ID(s) to be unloaded.
 * @param {Function} done Function that will be ran after data is loaded.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart>
 *   <c3-data></c3-data>
 * </c3-chart>
 * ```
 */
can.Component.extend({
	tag: "c3-data",
	viewModel: C3DataVM,
	events: {
		inserted: function(viewModel, ev) {
			this.viewModel.attr('chart', this.element.parent().scope().attr('chart'));
			this.viewModel.loadAllAttributesOnChart();
		},
		"{viewModel} change": function(viewModel, ev, attr, type, newVal, oldVal) {
			// console.log(attr, 'from', oldVal, 'to', newVal);
			this.viewModel.loadAttributeOnChart(attr);
		}
	}
});

export default C3DataVM;