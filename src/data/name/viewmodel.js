import DefineMap from "can-define/map/map";

export default DefineMap.extend({
	chart: {
		type: '*',
		value: null
	},
	'key': null,
	'updateName': function() {
		var chart = this.chart,
			newName = {};
		newName[this.key] = this.value;
		chart.data.names(newName);
	}
});