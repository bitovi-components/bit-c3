import can from "can";
import 'can/map/define/';
import {randomString} from 'bit-c3/lib/lib';

export default can.Map.extend({
	define: {
		"gridLine": {
			get: function() {
				return {
					value: this.attr('value'),
					text: this.attr('text'),
					position: this.attr('position'),
					class: this.attr('class')
				}
			}
		} 
	},
	lines: null,
	value: null,
	text: null,
	position: null,
	class: null,
	'key': null,
	'addToLines': function() {
		var key = randomString(50);
		this.attr('key', key);
		this.attr('lines').attr(key, this.attr('gridLine'));
	},
	'updateLines': function() {
		this.attr('lines').attr(this.attr('key'), this.attr('gridLine'));
	},
	'removeFromLines': function() {
		this.attr('lines').removeAttr(this.attr('key'));
	}
});