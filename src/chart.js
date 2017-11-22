import Component from "can-component";
import d3 from "d3";
import c3 from "c3";
import view from "./chart.stache";
import ChartVM from './viewmodel';

/**
 * @module {can.Component} bit-c3.components.bit-c3 <bit-c3>
 * @parent bit-c3.components 0
 *
 * @author Kyle Gifford
 *
 *
 * @description
 * Chart container
 *
 * @signature '<bit-c3></bit-c3>'
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 * <bit-c3></bit-c3>
 *
 * <bit-c3 axis-x-type="category"></bit-c3>
 * ```
 */
Component.extend({
    tag: "bit-c3",
    view,
    ViewModel: ChartVM,
    events: {
        inserted: function(viewModel, ev) {
            let rootElement = ev.target;

            this.viewModel.graphBaseElement = d3.select(rootElement.getElementsByClassName('chart-container')[0]);

            this.viewModel.chart = c3.generate(this.viewModel.config);
        },
        removed: function() {
            if (this.viewModel.chart){
                this.viewModel.graphBaseElement = undefined;
                this.viewModel.chart = this.viewModel.chart.destroy();
            }
        }
    }
});

export default ChartVM;
