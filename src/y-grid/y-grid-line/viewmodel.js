import { DefineMap } from "can"
import {randomString} from 'bit-c3/lib/lib';

export default DefineMap.extend({seal: false}, {
	gridLine: {
		get: function() {
			return {
				value: this.value,
				text: this.text,
				position: this.position,
				class: this.class
			}
		}
	} ,
	lines: { value: null },
	value: { value: null },
	text: { value: null },
	position: { value: null },
	class: { value: null },
	key: { value: null },
	addToLines: function() {
		var key = randomString(50);
		this.key = key;
		if (this.lines){
			this.lines[key] = this.gridLine;
		}
	},
	updateLines: function() {
		if (this.lines){
			this.lines[this.key] = this.gridLine;
		}
	},
	removeFromLines: function() {
		if (this.lines){
			this.lines[this.key] = undefined;
		}
	}
});