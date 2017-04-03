import DefineMap from "can-define/map/map";

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
	'value': null,
	'key': null,
	'dequeueKey': function() {
		var value = this.value && this.value.get(),
			key = this.key;
		if(value !== null && (key === null || (value.length && value[0] === key))) {
			this.key = value.shift();
		}
		return value;
	},
	'updateColumn': function() {
		var value = this.dequeueKey(this.value),
			key = this.key,
			chart = this.chart,
			pushing = [key].concat(value);
		if(value && value.length) {
			chart.load({
				columns: [pushing]
			});
		} else {
			this.unloadColumn();
		}
	},
	'unloadColumn': function() {
		this.chart.unload({
			ids: this.key
		});
	}
});
