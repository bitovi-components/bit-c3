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
    viewModel: ChartVM,
    events: {
        inserted: function(viewModel, ev) {
            var rootElement = ev.target,
              graphBaseElement = d3.select(rootElement.getElementsByClassName('chart-container')[0]),
              axisXType = this.viewModel.attr('axisXType'),
              config = {
                  bindto: graphBaseElement,
                  data: {
                      columns: []
                  }
              };

            if (axisXType){
                config.data.x = 'x';
                config.axis = {
                    x: {
                        type: axisXType
                    }
                }
            }

            this.viewModel.chart = c3.generate(config);
        },
        removed: function() {
            if (this.viewModel.chart){
                this.viewModel.chart = this.viewModel.chart.destroy();
            }
        }
    }
});

export default ChartVM;
