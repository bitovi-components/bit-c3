import { DefineMap } from "can"
import {randomString} from 'bit-c3/lib/lib';

export default DefineMap.extend({seal: false}, {
	'valueSerialized': {
		get: function() {
			return this.value.get();
		}
	},
	groups: { value: null },
	key: { value: null },
	value: { value: null },
	addToGroups: function() {
		var key = randomString(50);
		this.key = key;
		if (this.groups){
			this.groups[key] = this.value;
		}
	},
	updateGroup: function() {
		if (this.groups){
			this.groups[this.key] = this.value;
		}
	},
	removeFromGroups: function() {
		if (this.groups){
			this.groups[this.key] = undefined;
		}
	}
});