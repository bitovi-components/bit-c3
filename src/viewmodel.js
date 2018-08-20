import { DefineMap } from "can";
import d3 from "d3";
import c3 from "c3";

export default DefineMap.extend({
	chart: {
		value: null
	},
	/**
	 * Dom element that chart will be bound to.
	 */
	graphBaseElement: {
		type: '*'
	},
	/**
	 * Config object that c3 chart will be generated with.
	 */
	config: {
		type: '*',
		get (val) {
			let config = val || {};
			config.bindto = this.graphBaseElement;
			if (!config.data){
				config.data = {
					columns: []
				};
				if (val && val.axis && val.axis.x && val.axis.x.type === 'category' && !val.axis.x.categories) {
					config.data.x = 'x';
				}
			}
			console.log('config', config)
			return config;
		}
	},
	connectedCallback: function(el) {
		let rootElement = el;

		this.graphBaseElement = d3.select(rootElement.getElementsByClassName('chart-container')[0]);

		this.chart = c3.generate(this.config);

		let _this = this
		return function() {
			if (_this.chart){
				_this.graphBaseElement = undefined;
				_this.chart = _this.chart.destroy();
			}
		}
	}
});