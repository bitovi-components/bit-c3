import DefineMap from "can-define/map/map";

export default DefineMap.extend({seal: false}, {
	define: {
		chart: {
			type: '*',
			value: null
		},
		linesSerialized: {
			get: function() {
				return this.lines.get();
			}
		}
	},
	lines: {},
	updateLines: function() {
		var lines = [];
    this.lines && this.lines.forEach(function(value, key) {
			lines.push(value);
		});
		this.chart.ygrids(lines);
	}
});