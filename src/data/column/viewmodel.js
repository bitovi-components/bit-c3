import can from "can/legacy";
import 'can/map/define/';

export default can.Map.extend({
	define: {
		chart: {
			type: '*',
			value: null
		},
		valueSerialized: {
			get: function(val) {
				return this.attr('value') && this.attr('value').serialize();
			}
		}
	},
	'value': null,
	'key': null,
	'dequeueKey': function() {
		var value = this.attr('value') && this.attr('value').attr(),
			key = this.attr('key');
		if(value !== null && (key === null || (value.length && value[0] === key))) {
			this.attr('key', value.shift());
		}
		return value;
	},
	'updateColumn': function() {
		var value = this.dequeueKey(this.attr('value')),
			key = this.attr('key'),
			chart = this.attr('chart'),
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
		this.attr('chart').unload({
			ids: this.attr('key')
		});
	}
});
