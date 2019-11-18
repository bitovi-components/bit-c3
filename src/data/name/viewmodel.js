import { DefineMap } from "can";

export default DefineMap.extend({
	chart: {
		type: '*',
		value: null
	},
	key: { value: null },
	updateName: function() {
		var chart = this.chart,
			newName = {};
		newName[this.key] = this.value;
		chart.data.names(newName);
	}
});