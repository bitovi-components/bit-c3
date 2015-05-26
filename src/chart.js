import can from "can";
import d3 from "d3";
import c3 from "c3";
import "c3/c3.css!";
import template from "./chart.stache!";
import C3ChartViewModel from './viewmodel';

/**
 * @module {can.Component} c3-chart.components.c3-chart <c3-chart>
 * @parent c3-chart.components 0
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