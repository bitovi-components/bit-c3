import DefineMap from "can-define/map/map";

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
		get (val = {}) {
			let config = val;
			config.bindto = this.graphBaseElement;
			if (!config.data){
				config.data = {
					columns: []
				};
				if (val.axis && val.axis.x && val.axis.x.type === 'category' && !val.axis.x.categories) {
					config.data.x = 'x';
				}
			}
			return config;
		}
	}
});