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
		if (this.groups){
			this.groups[key] = this.value;
		}
	},
	'updateGroup': function() {
    if (this.groups){
    	this.groups[this.key] = this.value;
    }
	},
	'removeFromGroups': function() {
    if (this.groups){
    	this.groups[this.key] = undefined;
    }
	}
});