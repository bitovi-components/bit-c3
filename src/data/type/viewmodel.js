import DefineMap from "can-define/map/map";

export default DefineMap.extend({seal: false}, {
	define: {
		chart: {
			type: '*',
			value: null
		}
	},
	'key': null,
	'updateType': function() {
		var chart = this.chart;
		chart.transform(this.value, this.key);
	}
});