import { DefineMap, viewModel as canViewModel } from "can"

export default DefineMap.extend({seal: false}, {
	chart: {
		type: '*',
		value: null
	},
	valueSerialized: {
		get: function(val) {
			return this.value && this.value.get();
		}
	},
	value: { value: null },
	key: { value: null },
	dequeueKey: function() {
		var value = this.value && this.value.get(),
			key = this.key;
		if(value !== null && (key === null || (value.length && value[0] === key))) {
			this.key = value.shift();
		}
		return value;
	},
	updateColumn: function() {
		var value = this.dequeueKey(this.value),
			key = this.key,
			chart = this.chart,
			pushing = [key].concat(value),
			columns = [pushing];

		if (this.axisX){
			columns.unshift(this.axisX.get());
		}
		if(value && value.length) {
			chart.load({
				columns: columns
			});
		} else {
			this.unloadColumn();
		}
	},
	unloadColumn: function() {
		this.chart.unload({
			ids: this.key
		});
	},
	connectedCallback: function(el) {
		this.chart = canViewModel(el.parentElement).chart;
		this.updateColumn();
		const _this = this;
		return function() {
			// check if the chart was not destroyed:
			if (el.parentElement && canViewModel(el.parentElement).chart){
				_this.unloadColumn();
			}
		}
	}
});
