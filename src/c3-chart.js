import can from "can";
import d3 from "d3";
import c3 from "c3";
import "c3/c3.css!";
import "./c3-data/";
import "./c3-y-grid/";
import template from "./c3-chart.stache!";
import C3ChartViewModel from './viewmodel';

/**
 * @module {can.Component} c3-chart.reference.c3-chart <c3-chart>
 * @parent c3-chart.reference 1
 * @group c3-chart.reference.c3-chart.c3-data 0 <c3-data>
 *
 * @author Kyle Gifford
 *
 *
 * @description
 * Chart container
 *
 * @signature '<c3-chart></chart>'
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <c3-chart></c3-chart>
 * ```
 */
can.Component.extend({
    tag: "c3-chart",
    template: template,
    viewModel: C3ChartViewModel,
    events: {
		inserted: function(viewModel, ev) {
            var rootElement = ev.target,
                graphBaseElement = d3.select(rootElement.getElementsByClassName('chart-container')[0]),
                chart = c3.generate({
				    bindto: graphBaseElement,
				    data: {
				    	columns: []
				    }
				});
			this.viewModel.attr('chart', chart);
        },
        removed: function() {
        	this.viewmodel.attr('chart', this.viewModel.attr('chart').destroy());
        }
    }
});

export default C3ChartViewModel;