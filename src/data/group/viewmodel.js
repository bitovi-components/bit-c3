import can from "can";
import 'can/map/define/';
import {randomString} from 'lib/';

export default can.Map.extend({
	define: {
		'valueSerialized': {
			get: function() {
				return this.attr('value').serialize();
			}
		}
	},
	'groups': null,
	'key': null,
	'value': null,
	'addToGroups': function() {
		var key = randomString(50);
		this.attr('key', key);
		this.attr('groups').attr(key, this.attr('value'));
	},
	'updateGroup': function() {
		this.attr('groups').attr(this.attr('key'), this.attr('value'));
	},
	'removeFromGroups': function() {
		this.attr('groups').removeAttr(this.attr('key'));
	}
});