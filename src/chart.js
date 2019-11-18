import { Component } from "can";
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
    ViewModel: ChartVM
});

export default ChartVM;
