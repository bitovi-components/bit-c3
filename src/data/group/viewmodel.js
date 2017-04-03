import DefineMap from "can-define/map/map";
import {randomString} from 'bit-c3/lib/lib';

export default DefineMap.extend({seal: false}, {
	'valueSerialized': {
		get: function() {
			return this.value.get();
		}
	},
	'groups': null,
	'key': null,
	'value': null,
	'addToGroups': function() {
		var key = randomString(50);
		this.key = key;
		this.groups[key] = this.value;
	},
	'updateGroup': function() {
		this.groups[this.key] = this.value;
	},
	'removeFromGroups': function() {
		this.groups[this.key] = undefined;
	}
});