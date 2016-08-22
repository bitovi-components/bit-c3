import can from "can/legacy";
import 'can/map/define/';

export default can.Map.extend({
	define: {
		chart: {
			type: '*',
			value: null
		}
	},
	'key': null,
	'updateType': function() {
		var chart = this.attr('chart');
		chart.transform(this.attr('value'), this.attr('key'));
	}
});