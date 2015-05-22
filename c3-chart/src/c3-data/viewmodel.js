import can from "can";
import 'can/map/define/';

export default can.Map.extend({
	define: {
		chart: {
			type: '*',
			value: null
		},
		groupsSerialized: {
			get: function() {
				return this.attr('groups').serialize();
			}
		}
	},
	groups: {},
	standardAttributes: ['url', 'json', 'columns', 'rows', 'classes', 'categories', 'axes', 'colors', 'types', 'unload', 'done'],
	loadAllAttributesOnChart: function() {
		this.each((item, key) => {
			this.loadAttributeOnChart(key, item);
		});
	},
	loadAttributeOnChart: function(attribute, value) {
		// if no value is passed, retrieve it
		if(value === undefined) {
			value = this.attr(attribute);
		}

		if(attribute.indexOf('.') !== -1) {
			attribute = attribute.substr(0, attribute.indexOf('.'));
			value = this.attr(attribute);
		}

		var chart = this.attr('chart');
		switch(true) {
			// groups change
			case (attribute === 'groupsSerialized' || attribute === 'groups'):
				var groups = [];
				this.attr('groups').each(function(value, key) {
					groups.push(value);
				});
				chart.groups(groups);
				break;
			// type change - full graph
			case (attribute === 'type'):
				chart.transform(value);
				break;
			// attributes to ignore
			case (attribute === 'chart'):
			case (attribute === 'standardAttributes'):
				break;
			// names change
			case (attribute === 'names'):
				chart.data.names(value);
				break;
			// standard attributes
			case (this.attr('standardAttributes').indexOf(attribute) !== -1):
				var loadVal = {};
				loadVal[attribute] = value;
				chart.load(loadVal);
				break;
			// we don't have a setter for this, warn and ignore it
			default:
				console.warn('The', attribute, 'property cannot be updated');
				break;
		}
	}
});