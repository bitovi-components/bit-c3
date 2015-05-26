import can from "can";
import 'can/map/define/';

export default can.Map.extend({
	define: {
		chart: {
			type: '*',
			value: null
		}
	},
	'key': null,
	'updateName': function() {
		var chart = this.attr('chart'),
			newName = {};
		newName[this.attr('key')] = this.attr('value');
		chart.data.names(newName);
	}
});