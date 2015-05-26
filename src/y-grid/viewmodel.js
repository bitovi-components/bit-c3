import can from "can";
import 'can/map/define/';

export default can.Map.extend({
	define: {
		chart: {
			type: '*',
			value: null
		},
		linesSerialized: {
			get: function() {
				return this.attr('lines').serialize();
			}
		}
	},
	lines: {},
	updateLines: function() {
		var lines = [];
		this.attr('lines').each(function(value, key) {
			lines.push(value);
		});
		this.attr('chart').ygrids(lines);
	}
});